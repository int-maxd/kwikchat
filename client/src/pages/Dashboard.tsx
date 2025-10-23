import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  MessageCircle,
  Users,
  MessageSquare,
  Bot,
  TrendingUp,
  Settings,
} from 'lucide-react';

interface Statistics {
  totalConversations: number;
  activeConversations: number;
  totalMessages: number;
  messagesToday: number;
  activeAutomationRules: number;
  totalAutomationRules: number;
}

interface Conversation {
  id: number;
  phoneNumber: string;
  contactName: string | null;
  status: string;
  lastMessageAt: string | null;
  assignedTo: string | null;
}

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery<Statistics>({
    queryKey: ['/api/statistics'],
  });

  const { data: conversations, isLoading: conversationsLoading } = useQuery<Conversation[]>({
    queryKey: ['/api/conversations'],
  });

  const recentConversations = conversations?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <MessageCircle className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold">
                kwik<span className="text-green-600">CHAT</span>
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/conversations">
              <Button variant="ghost" data-testid="button-conversations">
                <MessageSquare className="w-4 h-4 mr-2" />
                Conversations
              </Button>
            </Link>
            <Link href="/automation">
              <Button variant="ghost" data-testid="button-automation">
                <Bot className="w-4 h-4 mr-2" />
                Automation
              </Button>
            </Link>
            <Button variant="ghost" data-testid="button-settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">Monitor your WhatsApp business conversations</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card data-testid="card-stat-conversations">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? '...' : stats?.totalConversations || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats?.activeConversations || 0} active
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-messages">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages Today</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? '...' : stats?.messagesToday || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats?.totalMessages || 0} total
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-automation">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Automation Rules</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? '...' : stats?.activeAutomationRules || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats?.totalAutomationRules || 0} total
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Conversations</CardTitle>
              <Link href="/conversations">
                <Button variant="outline" size="sm" data-testid="button-view-all">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {conversationsLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : recentConversations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No conversations yet. Connect your WhatsApp Business account to get started.
              </div>
            ) : (
              <div className="space-y-4">
                {recentConversations.map((conversation) => (
                  <Link key={conversation.id} href={`/conversations/${conversation.id}`}>
                    <div
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition"
                      data-testid={`conversation-${conversation.id}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {conversation.contactName || conversation.phoneNumber}
                          </div>
                          <div className="text-sm text-gray-500">{conversation.phoneNumber}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          {conversation.lastMessageAt
                            ? new Date(conversation.lastMessageAt).toLocaleDateString()
                            : 'No messages'}
                        </div>
                        <div className="text-xs">
                          <span
                            className={`px-2 py-1 rounded-full ${
                              conversation.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {conversation.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
