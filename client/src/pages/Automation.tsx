import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import {
  MessageCircle,
  Bot,
  Plus,
  Trash2,
  Settings,
  ArrowLeft,
} from 'lucide-react';

interface AutomationRule {
  id: number;
  name: string;
  trigger: string;
  conditions: string | null;
  actions: string;
  isActive: boolean;
}

export default function Automation() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    trigger: 'message_received',
    actions: '',
    isActive: true,
  });

  const { toast } = useToast();

  const { data: rules, isLoading } = useQuery<AutomationRule[]>({
    queryKey: ['/api/automation-rules'],
  });

  const createRuleMutation = useMutation({
    mutationFn: async (rule: typeof newRule) => {
      const actionsArray = rule.actions.split('\n').filter(a => a.trim()).map(action => ({
        type: 'send_message',
        content: action.trim(),
      }));

      return apiRequest('POST', '/api/automation-rules', {
        name: rule.name,
        trigger: rule.trigger,
        conditions: null,
        actions: JSON.stringify(actionsArray),
        isActive: rule.isActive,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/automation-rules'] });
      setDialogOpen(false);
      setNewRule({
        name: '',
        trigger: 'message_received',
        actions: '',
        isActive: true,
      });
      toast({
        title: 'Success',
        description: 'Automation rule created successfully.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to create automation rule.',
        variant: 'destructive',
      });
    },
  });

  const toggleRuleMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      return apiRequest('PATCH', `/api/automation-rules/${id}`, { isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/automation-rules'] });
      toast({
        title: 'Success',
        description: 'Automation rule updated.',
      });
    },
  });

  const deleteRuleMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest('DELETE', `/api/automation-rules/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/automation-rules'] });
      toast({
        title: 'Success',
        description: 'Automation rule deleted.',
      });
    },
  });

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    createRuleMutation.mutate(newRule);
  };

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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Automation Rules</h1>
            <p className="text-gray-600">Configure automated responses and workflows</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-create-rule">
                <Plus className="w-4 h-4 mr-2" />
                Create Rule
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleCreateRule}>
                <DialogHeader>
                  <DialogTitle>Create Automation Rule</DialogTitle>
                  <DialogDescription>
                    Set up automated responses for your WhatsApp conversations
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Rule Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Welcome Message"
                      value={newRule.name}
                      onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                      required
                      data-testid="input-rule-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trigger">Trigger</Label>
                    <select
                      id="trigger"
                      className="w-full border rounded-md p-2"
                      value={newRule.trigger}
                      onChange={(e) => setNewRule({ ...newRule, trigger: e.target.value })}
                      data-testid="select-trigger"
                    >
                      <option value="new_conversation">New Conversation</option>
                      <option value="message_received">Message Received</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="actions">Response Messages (one per line)</Label>
                    <Textarea
                      id="actions"
                      placeholder="Welcome! How can we help you today?"
                      value={newRule.actions}
                      onChange={(e) => setNewRule({ ...newRule, actions: e.target.value })}
                      required
                      rows={4}
                      data-testid="textarea-actions"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={newRule.isActive}
                      onCheckedChange={(checked) =>
                        setNewRule({ ...newRule, isActive: checked })
                      }
                      data-testid="switch-active"
                    />
                    <Label htmlFor="active">Active</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={createRuleMutation.isPending}
                    data-testid="button-submit-rule"
                  >
                    Create Rule
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : rules?.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Bot className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 mb-4">No automation rules yet</p>
              <p className="text-sm text-gray-400 mb-6">
                Create your first rule to start automating WhatsApp conversations
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rules?.map((rule) => (
              <Card key={rule.id} data-testid={`rule-card-${rule.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-green-600" />
                      <CardTitle className="text-lg">{rule.name}</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteRuleMutation.mutate(rule.id)}
                      data-testid={`button-delete-${rule.id}`}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-500">Trigger</div>
                      <div className="text-sm font-medium">
                        {rule.trigger.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Actions</div>
                      <div className="text-sm">
                        {JSON.parse(rule.actions).map((action: any, idx: number) => (
                          <div key={idx} className="mt-1 p-2 bg-gray-50 rounded text-xs">
                            {action.content}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="text-sm text-gray-500">Status</span>
                      <Switch
                        checked={rule.isActive}
                        onCheckedChange={(checked) =>
                          toggleRuleMutation.mutate({ id: rule.id, isActive: checked })
                        }
                        data-testid={`switch-toggle-${rule.id}`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
