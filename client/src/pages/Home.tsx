import { useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  MessageCircle,
  Bot,
  Users,
  Zap,
  Clock,
  BarChart3,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Settings,
  Send,
} from 'lucide-react';

export default function Home() {
  useEffect(() => {
    document.title = "WhatsApp Business Automation | ChatFlow";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold">ChatFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-sm font-medium hover:text-green-600 transition">Features</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-green-600 transition">How It Works</a>
            <a href="#pricing" className="text-sm font-medium hover:text-green-600 transition">Pricing</a>
            <Link href="/dashboard">
              <Button data-testid="button-dashboard">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="py-20 md:py-32 bg-gradient-to-b from-green-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Automate Your WhatsApp Business Conversations
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Engage customers 24/7 with intelligent automation, human intervention when needed,
                and seamless integration with Meta's WhatsApp Cloud API
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto" data-testid="button-get-started">
                    Get Started Free
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-watch-demo">
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
              <p className="text-xl text-gray-600">Powerful features to manage your WhatsApp conversations</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card data-testid="card-feature-automation">
                <CardContent className="pt-6">
                  <Bot className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Smart Automation</h3>
                  <p className="text-gray-600">
                    Create programmable message flows with triggers, conditions, and actions to automate responses
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-feature-human">
                <CardContent className="pt-6">
                  <Users className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Human Intervention</h3>
                  <p className="text-gray-600">
                    Seamlessly hand off conversations to human agents when automation isn't enough
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-feature-realtime">
                <CardContent className="pt-6">
                  <Zap className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Real-time Messaging</h3>
                  <p className="text-gray-600">
                    Send and receive messages instantly with Meta's WhatsApp Cloud API integration
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-feature-sessions">
                <CardContent className="pt-6">
                  <MessageSquare className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Session Management</h3>
                  <p className="text-gray-600">
                    Track and manage conversation sessions with detailed metadata and analytics
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-feature-analytics">
                <CardContent className="pt-6">
                  <BarChart3 className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-600">
                    Monitor conversation metrics, response times, and automation performance
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-feature-configuration">
                <CardContent className="pt-6">
                  <Settings className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Easy Configuration</h3>
                  <p className="text-gray-600">
                    Set up automation rules and conversation flows without writing code
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-gray-600">Get started in minutes</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex gap-6 items-start" data-testid="step-connect">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Connect Your WhatsApp Business Account</h3>
                  <p className="text-gray-600">
                    Link your Meta Business WhatsApp account using the Cloud API. We'll guide you through the setup process.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start" data-testid="step-configure">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Configure Automation Rules</h3>
                  <p className="text-gray-600">
                    Create triggers and automated responses for common customer inquiries. Set up welcome messages, business hours responses, and more.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start" data-testid="step-manage">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Manage Conversations</h3>
                  <p className="text-gray-600">
                    Monitor all conversations in one dashboard. Jump in to provide human support when needed, or let automation handle routine inquiries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Results That Matter</h2>
              <p className="text-xl text-gray-600">See the impact on your business</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center" data-testid="stat-response-time">
                <div className="text-4xl font-bold text-green-600 mb-2">10x</div>
                <div className="text-gray-600">Faster Response Time</div>
              </div>
              <div className="text-center" data-testid="stat-availability">
                <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
                <div className="text-gray-600">Customer Availability</div>
              </div>
              <div className="text-center" data-testid="stat-automation">
                <div className="text-4xl font-bold text-green-600 mb-2">70%</div>
                <div className="text-gray-600">Queries Automated</div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-green-600 text-white rounded-2xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Customer Engagement?</h2>
              <p className="text-xl mb-8 opacity-90">
                Start automating your WhatsApp conversations today
              </p>
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" data-testid="button-get-started-cta">
                  Get Started Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-green-600" />
              <span className="font-bold">ChatFlow</span>
            </div>
            <div className="text-sm text-gray-600">
              © 2025 ChatFlow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
