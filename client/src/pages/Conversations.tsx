import { useQuery, useMutation } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import {
  MessageCircle,
  Users,
  Send,
  ArrowLeft,
  Bot,
  User,
} from 'lucide-react';

interface Conversation {
  id: number;
  phoneNumber: string;
  contactName: string | null;
  status: string;
  lastMessageAt: string | null;
  assignedTo: string | null;
}

interface Message {
  id: number;
  conversationId: number;
  content: string;
  sender: string;
  messageType: string;
  timestamp: string;
  status: string;
  isFromUser: boolean;
}

export default function Conversations() {
  const [match, params] = useRoute('/conversations/:id');
  const conversationId = params?.id ? parseInt(params.id) : null;

  const { data: conversations, isLoading: conversationsLoading } = useQuery<Conversation[]>({
    queryKey: ['/api/conversations'],
  });

  const { data: messages, isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ['/api/conversations', conversationId, 'messages'],
    enabled: !!conversationId,
  });

  const { data: conversation } = useQuery<Conversation>({
    queryKey: ['/api/conversations', conversationId],
    enabled: !!conversationId,
  });

  const [messageText, setMessageText] = useState('');
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      return apiRequest('POST', '/api/messages', {
        conversationId,
        content,
        sender: 'agent',
        isFromUser: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/conversations', conversationId, 'messages'] });
      queryClient.invalidateQueries({ queryKey: ['/api/conversations'] });
      setMessageText('');
      toast({
        title: 'Message sent',
        description: 'Your message has been sent successfully.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() && conversationId) {
      sendMessageMutation.mutate(messageText);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard">
            <div className="flex items-center gap-2 cursor-pointer">
              <MessageCircle className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold">
                kwik<span className="text-green-600">CHAT</span>
              </span>
            </div>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" data-testid="button-back-dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          <Card className="lg:col-span-1 overflow-auto">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              {conversationsLoading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : conversations?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No conversations</div>
              ) : (
                <div className="space-y-2">
                  {conversations?.map((conv) => (
                    <Link key={conv.id} href={`/conversations/${conv.id}`}>
                      <div
                        className={`p-3 border rounded-lg cursor-pointer transition ${
                          conversationId === conv.id
                            ? 'bg-green-50 border-green-600'
                            : 'hover:bg-gray-50'
                        }`}
                        data-testid={`conversation-item-${conv.id}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">
                              {conv.contactName || conv.phoneNumber}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {conv.phoneNumber}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 flex flex-col">
            {conversationId ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle>
                        {conversation?.contactName || conversation?.phoneNumber}
                      </CardTitle>
                      <div className="text-sm text-gray-500">
                        {conversation?.phoneNumber}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-auto p-6">
                  {messagesLoading ? (
                    <div className="text-center py-8 text-gray-500">Loading messages...</div>
                  ) : messages?.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No messages yet</div>
                  ) : (
                    <div className="space-y-4">
                      {messages?.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isFromUser ? 'justify-start' : 'justify-end'}`}
                          data-testid={`message-${message.id}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.isFromUser
                                ? 'bg-gray-100 text-gray-900'
                                : 'bg-green-600 text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {message.isFromUser ? (
                                <User className="w-3 h-3" />
                              ) : (
                                <Bot className="w-3 h-3" />
                              )}
                              <span className="text-xs opacity-75">
                                {message.isFromUser ? 'Customer' : message.sender}
                              </span>
                            </div>
                            <div className="whitespace-pre-wrap">{message.content}</div>
                            <div className="text-xs opacity-75 mt-1">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </CardContent>

                <div className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      disabled={sendMessageMutation.isPending}
                      data-testid="input-message"
                    />
                    <Button
                      type="submit"
                      disabled={!messageText.trim() || sendMessageMutation.isPending}
                      data-testid="button-send-message"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select a conversation to view messages</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
