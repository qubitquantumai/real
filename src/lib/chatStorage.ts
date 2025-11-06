import { supabase } from './supabase';
import { useAuth } from '../contexts/AuthContext';

export interface ChatMessage {
  id: string;
  conversation_id: string;
  user_id?: string;
  message: string;
  is_user: boolean;
  timestamp: string;
  session_id?: string;
  user_ip?: string;
  user_agent?: string;
}

export interface ConversationSummary {
  conversation_id: string;
  user_id?: string;
  session_id?: string;
  message_count: number;
  started_at: string;
  last_message_at: string;
  user_messages: number;
  bot_messages: number;
}

class ChatStorageService {
  private conversationId: string | null = null;
  private sessionId: string;

  constructor() {
    // Generate a unique session ID for anonymous users
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateConversationId(): string {
    return crypto.randomUUID();
  }

  private getUserInfo() {
    return {
      ip: this.getClientIP(),
      userAgent: navigator.userAgent
    };
  }

  private getClientIP(): string {
    // Note: Getting real client IP requires server-side implementation
    // For now, we'll use a placeholder
    return 'client_ip_placeholder';
  }

  public async startNewConversation(): Promise<string> {
    this.conversationId = this.generateConversationId();
    return this.conversationId;
  }

  public getCurrentConversationId(): string {
    if (!this.conversationId) {
      this.conversationId = this.generateConversationId();
    }
    return this.conversationId;
  }

  public async saveMessage(
    message: string, 
    isUser: boolean, 
    userId?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const conversationId = this.getCurrentConversationId();
      const userInfo = this.getUserInfo();

      const messageData = {
        conversation_id: conversationId,
        user_id: userId || null,
        message: message.trim(),
        is_user: isUser,
        session_id: this.sessionId,
        user_ip: userInfo.ip,
        user_agent: userInfo.userAgent,
        timestamp: new Date().toISOString()
      };

      const { error } = await supabase
        .from('chat_messages')
        .insert([messageData]);

      if (error) {
        console.error('Error saving chat message:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Error in saveMessage:', error);
      return { success: false, error: error.message };
    }
  }

  public async getConversationHistory(
    conversationId: string
  ): Promise<{ messages: ChatMessage[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error fetching conversation history:', error);
        return { messages: [], error: error.message };
      }

      return { messages: data || [] };
    } catch (error: any) {
      console.error('Error in getConversationHistory:', error);
      return { messages: [], error: error.message };
    }
  }

  public async getUserConversations(
    userId: string
  ): Promise<{ conversations: ConversationSummary[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('conversation_summaries')
        .select('*')
        .eq('user_id', userId)
        .order('last_message_at', { ascending: false });

      if (error) {
        console.error('Error fetching user conversations:', error);
        return { conversations: [], error: error.message };
      }

      return { conversations: data || [] };
    } catch (error: any) {
      console.error('Error in getUserConversations:', error);
      return { conversations: [], error: error.message };
    }
  }

  public async getAllConversations(): Promise<{ conversations: ConversationSummary[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('conversation_summaries')
        .select('*')
        .order('last_message_at', { ascending: false });

      if (error) {
        console.error('Error fetching all conversations:', error);
        return { conversations: [], error: error.message };
      }

      return { conversations: data || [] };
    } catch (error: any) {
      console.error('Error in getAllConversations:', error);
      return { conversations: [], error: error.message };
    }
  }

  public async searchMessages(
    searchTerm: string,
    userId?: string
  ): Promise<{ messages: ChatMessage[]; error?: string }> {
    try {
      let query = supabase
        .from('chat_messages')
        .select('*')
        .ilike('message', `%${searchTerm}%`)
        .order('timestamp', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error searching messages:', error);
        return { messages: [], error: error.message };
      }

      return { messages: data || [] };
    } catch (error: any) {
      console.error('Error in searchMessages:', error);
      return { messages: [], error: error.message };
    }
  }

  public async getConversationStats(): Promise<{
    stats: {
      totalConversations: number;
      totalMessages: number;
      averageMessagesPerConversation: number;
      activeConversationsToday: number;
    };
    error?: string;
  }> {
    try {
      // Get total conversations
      const { count: totalConversations, error: convError } = await supabase
        .from('conversation_summaries')
        .select('*', { count: 'exact', head: true });

      if (convError) throw convError;

      // Get total messages
      const { count: totalMessages, error: msgError } = await supabase
        .from('chat_messages')
        .select('*', { count: 'exact', head: true });

      if (msgError) throw msgError;

      // Get conversations from today
      const today = new Date().toISOString().split('T')[0];
      const { count: activeToday, error: todayError } = await supabase
        .from('conversation_summaries')
        .select('*', { count: 'exact', head: true })
        .gte('started_at', `${today}T00:00:00.000Z`)
        .lt('started_at', `${today}T23:59:59.999Z`);

      if (todayError) throw todayError;

      const averageMessagesPerConversation = totalConversations > 0 
        ? Math.round((totalMessages || 0) / totalConversations) 
        : 0;

      return {
        stats: {
          totalConversations: totalConversations || 0,
          totalMessages: totalMessages || 0,
          averageMessagesPerConversation,
          activeConversationsToday: activeToday || 0
        }
      };
    } catch (error: any) {
      console.error('Error in getConversationStats:', error);
      return {
        stats: {
          totalConversations: 0,
          totalMessages: 0,
          averageMessagesPerConversation: 0,
          activeConversationsToday: 0
        },
        error: error.message
      };
    }
  }
}

// Export a singleton instance
export const chatStorage = new ChatStorageService();