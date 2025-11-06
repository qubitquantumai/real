import React, { useState, useEffect } from 'react';
import { MessageSquare, Users, TrendingUp, Clock, Search, Download, Filter, Calendar, BarChart3, Eye } from 'lucide-react';
import { chatStorage, ConversationSummary, ChatMessage } from '../../lib/chatStorage';
import { useAuth } from '../../contexts/AuthContext';

const ChatAnalytics: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalConversations: 0,
    totalMessages: 0,
    averageMessagesPerConversation: 0,
    activeConversationsToday: 0
  });
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [conversationMessages, setConversationMessages] = useState<ChatMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    setError(null);

    try {
      // Load stats
      const { stats: statsData, error: statsError } = await chatStorage.getConversationStats();
      if (statsError) {
        setError(statsError);
      } else {
        setStats(statsData);
      }

      // Load conversations
      const { conversations: conversationsData, error: conversationsError } = await chatStorage.getAllConversations();
      if (conversationsError) {
        setError(conversationsError);
      } else {
        setConversations(conversationsData);
      }
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  const loadConversationDetails = async (conversationId: string) => {
    try {
      const { messages, error } = await chatStorage.getConversationHistory(conversationId);
      if (error) {
        setError(error);
      } else {
        setConversationMessages(messages);
        setSelectedConversation(conversationId);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadAnalytics();
      return;
    }

    try {
      const { messages, error } = await chatStorage.searchMessages(searchTerm);
      if (error) {
        setError(error);
      } else {
        // Group messages by conversation for display
        const conversationMap = new Map<string, ConversationSummary>();
        messages.forEach(msg => {
          if (!conversationMap.has(msg.conversation_id)) {
            conversationMap.set(msg.conversation_id, {
              conversation_id: msg.conversation_id,
              user_id: msg.user_id,
              session_id: msg.session_id,
              message_count: 1,
              started_at: msg.timestamp,
              last_message_at: msg.timestamp,
              user_messages: msg.is_user ? 1 : 0,
              bot_messages: msg.is_user ? 0 : 1
            });
          }
        });
        setConversations(Array.from(conversationMap.values()));
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const exportConversations = () => {
    const csvContent = conversations.map(conv => 
      `${conv.conversation_id},${conv.user_id || 'Anonymous'},${conv.message_count},${conv.started_at},${conv.last_message_at}`
    ).join('\n');
    
    const blob = new Blob([`Conversation ID,User ID,Message Count,Started At,Last Message At\n${csvContent}`], 
      { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat_analytics_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">Please log in to view chat analytics.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Chat Analytics</h1>
          <p className="text-gray-400">Monitor and analyze chatbot conversations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: MessageSquare, label: 'Total Conversations', value: stats.totalConversations, color: 'blue' },
            { icon: BarChart3, label: 'Total Messages', value: stats.totalMessages, color: 'green' },
            { icon: TrendingUp, label: 'Avg Messages/Conv', value: stats.averageMessagesPerConversation, color: 'purple' },
            { icon: Clock, label: 'Active Today', value: stats.activeConversationsToday, color: 'orange' }
          ].map((stat, index) => (
            <div key={stat.label} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-400`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                Search
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={loadAnalytics}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={exportConversations}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Conversations List */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Conversations</h2>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                <p className="text-gray-400 mt-2">Loading conversations...</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {conversations.map((conv) => (
                  <div
                    key={conv.conversation_id}
                    onClick={() => loadConversationDetails(conv.conversation_id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                      selectedConversation === conv.conversation_id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">
                        {conv.user_id ? 'Authenticated User' : 'Anonymous'}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {conv.message_count} messages
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>Started: {new Date(conv.started_at).toLocaleDateString()}</span>
                      <span>Last: {new Date(conv.last_message_at).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
                {conversations.length === 0 && !loading && (
                  <div className="text-center py-8 text-gray-400">
                    No conversations found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Conversation Details */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Conversation Details</h2>
            {selectedConversation ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {conversationMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.is_user ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      msg.is_user
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-200'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a conversation to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAnalytics;