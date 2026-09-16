import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { LiveAutomationDemo, RichMessageShowcase } from '@/components/RichMessageShowcase';
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
  Mail,
  MapPin,
} from 'lucide-react';

const FEATURES = [
  { id: 'rule-based', label: 'Rule-Based Conversations', description: 'Automated flows & triggers' },
  { id: 'ai-conversations', label: 'AI Conversations', description: 'Intelligent chat responses' },
  { id: 'ai-intent-routing', label: 'AI Intent Routing', description: 'Monthly add-on' },
  { id: 'ai-sentiment-analysis', label: 'AI Sentiment Analysis', description: 'Monthly add-on' },
  { id: 'human-handover', label: 'Human Intervention', description: 'Seamless agent handoff' },
  { id: 'notifications-rich-media', label: 'Notifications & Rich Media', description: 'Templates, forms, carousels, buttons, lists & media' },
  { id: 'campaigns', label: 'Marketing Campaigns', description: 'Business-initiated messaging' },
  { id: 'omnichannel', label: 'Omnichannel Messaging', description: 'WhatsApp and Email today — Facebook and Instagram coming soon' },
  { id: 'integrations', label: 'System Integrations', description: 'n8n, WooCommerce, Google Calendar & more' },
  { id: 'analytics', label: 'Analytics Dashboard', description: 'Conversation insights' },
  { id: 'multi-user', label: 'Multi-User Access', description: 'Team collaboration' },
  { id: 'custom-branding', label: 'Custom Branding', description: 'White-label options' },
];

export default function Home() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    companyName: '',
    phone: '',
    role: '',
    message: '',
    selectedFeatures: [] as string[],
    preferredPlan: '',
  });

  const submitLeadMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/leads', {
        contactName: formData.contactName || null,
        email: formData.email,
        companyName: formData.companyName || null,
        phone: formData.phone || null,
        role: formData.role || null,
        message: formData.message || null,
        interestedFeatures: formData.selectedFeatures.join(', '),
        preferredPlan: formData.preferredPlan || null,
      });
    },
    onSuccess: () => {
      toast({
        title: "Thank you for your interest!",
        description: "We'll be in touch within 24 hours.",
      });
      setFormData({
        contactName: '',
        email: '',
        companyName: '',
        phone: '',
        role: '',
        message: '',
        selectedFeatures: [],
        preferredPlan: '',
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const handleFeatureToggle = (featureId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(featureId)
        ? prev.selectedFeatures.filter(f => f !== featureId)
        : [...prev.selectedFeatures, featureId],
    }));
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => {
    if (!phone) return true;
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    return /^(\+27|0)[6-8][0-9]{8}$/.test(cleaned);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || formData.selectedFeatures.length === 0) {
      toast({
        title: "Please fill in required fields",
        description: "Email and at least one feature selection are required.",
        variant: "destructive",
      });
      return;
    }
    
    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.phone && !validatePhone(formData.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid South African mobile number.",
        variant: "destructive",
      });
      return;
    }
    
    submitLeadMutation.mutate();
  };

  useEffect(() => {
    document.title = "WhatsApp Business Automation | kwikChat";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold">
                kwik<span className="text-green-600">CHAT</span>
              </span>
            </div>
            <p className="text-[10px] text-gray-400 pl-10">
              Powered by{" "}
              <a
                href="https://intentio.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-600 transition-colors underline underline-offset-2"
              >
                Intentio Software
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-sm font-medium hover:text-green-600 transition hidden sm:block">Features</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-green-600 transition hidden sm:block">How It Works</a>
            <a href="#pricing" className="text-sm font-medium hover:text-green-600 transition hidden sm:block">Pricing</a>
            <a href="#contact">
              <Button data-testid="button-get-started-nav">Get Started</Button>
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className="py-20 md:py-32 bg-gradient-to-b from-green-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-green-600 font-semibold mb-4 uppercase tracking-wide">WhatsApp Business Customer Communication Platform</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Automate Your WhatsApp Business
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Connect your WhatsApp Business Account and let kwikChat automate customer interactions — from enquiries and onboarding to quotes, status updates, and job notifications — while your team stays in full control from one central dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contact">
                  <Button size="lg" className="w-full sm:w-auto" data-testid="button-get-started">
                    Get Started Free
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
                <a href="#how-it-works">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-learn-more">
                    See How It Works
                  </Button>
                </a>
              </div>
              <p className="mt-6 text-sm text-gray-500">No technical skills needed. Our team will guide you through setup and onboarding.</p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <p className="text-green-600 font-semibold mb-3 uppercase tracking-wide text-sm">See it in action</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Watch automation work in real time</h2>
                <p className="text-gray-600 text-lg mb-6">
                  A customer reaches out. Your kwikChat bot handles it instantly — no waiting, no manual replies, no missed leads.
                </p>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" /> Responds instantly, 24/7</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" /> Collects info and books appointments</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" /> Sends reference numbers automatically</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" /> Your team can manage any conversation from the dashboard</li>
                </ul>
              </div>

              <div className="flex-1 flex justify-center">
                <LiveAutomationDemo />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="business-features-section py-20">
          <div className="container mx-auto px-4 relative z-10">
            <div className="business-features-heading text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Run Your Business on WhatsApp</h2>
              <p className="text-xl text-gray-600">Not just customer enquiries — automate your entire operation</p>
            </div>

            <div className="business-features-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="business-feature-card" data-testid="card-feature-automation">
                <CardContent className="pt-6">
                  <div className="business-feature-icon"><Bot /></div>
                  <h3 className="text-xl font-semibold mb-2">Automated Business Workflows</h3>
                  <p className="text-gray-600">
                    Automate your entire customer journey — from answering FAQs and capturing leads, to customer onboarding, quote requests, order confirmations, and delivery updates. Stop repeating yourself and let automation handle the routine.
                  </p>
                </CardContent>
              </Card>

              <Card className="business-feature-card" data-testid="card-feature-human">
                <CardContent className="pt-6">
                  <div className="business-feature-icon"><Users /></div>
                  <h3 className="text-xl font-semibold mb-2">Manage Conversations Anytime</h3>
                  <p className="text-gray-600">
                    Need to add a personal touch? Your team can step in and manage any conversation on behalf of your business, with full context of every automated exchange.
                  </p>
                </CardContent>
              </Card>

              <Card className="business-feature-card" data-testid="card-feature-realtime">
                <CardContent className="pt-6">
                  <div className="business-feature-icon"><Zap /></div>
                  <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
                  <p className="text-gray-600">
                    Send instant notifications using approved WhatsApp templates — job status updates, order confirmations, appointment reminders, and more. Keep customers informed automatically.
                  </p>
                </CardContent>
              </Card>

              <Card className="business-feature-card" data-testid="card-feature-notifications-rich-media">
                <CardContent className="pt-6">
                  <div className="business-feature-icon"><Send /></div>
                  <h3 className="text-xl font-semibold mb-2">Notifications &amp; Rich Media</h3>
                  <p className="text-gray-600">
                    Use WhatsApp Business messaging formats across your customer journeys — templates, images, video, audio, documents, forms, carousels, buttons, lists, and other supported interactive messages.
                  </p>
                </CardContent>
              </Card>

              <Card className="business-feature-card" data-testid="card-feature-sessions">
                <CardContent className="pt-6">
                  <div className="business-feature-icon"><MessageSquare /></div>
                  <h3 className="text-xl font-semibold mb-2">Connect Your Tools</h3>
                  <p className="text-gray-600">
                    Link to your CRM, accounting software, or any external system. Capture orders, log leads, update records — all triggered from WhatsApp conversations.
                  </p>
                </CardContent>
              </Card>

              <Card className="business-feature-card" data-testid="card-feature-analytics">
                <CardContent className="pt-6">
                  <div className="business-feature-icon"><BarChart3 /></div>
                  <h3 className="text-xl font-semibold mb-2">Know Your Numbers</h3>
                  <p className="text-gray-600">
                    Track chat volumes, response times, resolution rates, and automation performance. Spot where customers get stuck and optimise your flows with real insights
                  </p>
                </CardContent>
              </Card>

              <Card className="business-feature-card" data-testid="card-feature-configuration">
                <CardContent className="pt-6">
                  <div className="business-feature-icon"><Settings /></div>
                  <h3 className="text-xl font-semibold mb-2">Guided Setup</h3>
                  <p className="text-gray-600">
                    No technical skills needed — our team will walk you through the entire setup and onboarding process to get you up and running
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <RichMessageShowcase />

        <section id="integrations" className="py-20 bg-gradient-to-br from-slate-50 via-white to-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700 mb-4">
                Connect everything
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Tools, Working Together</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Trigger workflows, sync customer data, and keep your whole operation moving from one WhatsApp conversation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="border-green-200 shadow-sm hover:shadow-lg transition-shadow" data-testid="card-integration-n8n">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-lg">n8n</div>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available now</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">n8n Nodes</h3>
                  <p className="text-gray-600">
                    Connect kwikChat to the tools you already use with reusable n8n nodes and flexible workflow automation.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 shadow-sm hover:shadow-lg transition-shadow" data-testid="card-integration-woocommerce">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">W</div>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available now</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">WooCommerce</h3>
                  <p className="text-gray-600">
                    Bring orders, customer updates, delivery notifications, and support conversations together on WhatsApp.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 shadow-sm hover:shadow-lg transition-shadow" data-testid="card-integration-google-calendar">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">G</div>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available now</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Google Calendar</h3>
                  <p className="text-gray-600">
                    Coordinate bookings, reminders, and appointment updates without leaving the customer conversation.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-8">
              <div className="rounded-2xl border border-dashed border-green-300 bg-white/80 p-6">
                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700 mb-3">
                  Coming soon
                </span>
                <h3 className="text-lg font-semibold mb-2">Business system integrations</h3>
                <p className="text-gray-600">
                  CRM, accounting, and customer support tools will be added to the kwikChat integration network.
                </p>
              </div>
              <div className="rounded-2xl border border-dashed border-blue-300 bg-white/80 p-6">
                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 mb-3">
                  Future integrations
                </span>
                <h3 className="text-lg font-semibold mb-2">More ways to connect your workflow</h3>
                <p className="text-gray-600">
                  Ecommerce, payment, productivity, and project tools are planned as the kwikChat ecosystem grows.
                </p>
              </div>
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
                  <h3 className="text-xl font-semibold mb-2">Connect &amp; Authorise Your WhatsApp Business Account</h3>
                  <p className="text-gray-600">
                    Authorise kwikChat to manage communications on your behalf — using a new or existing WhatsApp Business number. You remain the owner of your WhatsApp Business Account at all times.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start" data-testid="step-configure">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">We Build Your Workflows Together</h3>
                  <p className="text-gray-600">
                    During onboarding, we'll work with you to set up your automated flows — welcome messages, FAQs, onboarding sequences, quote requests, and more.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start" data-testid="step-manage">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">You're Always In Control</h3>
                  <p className="text-gray-600">
                    Monitor all conversations from your dashboard. Let automation handle the routine while your team manages conversations directly whenever needed — on behalf of your business.
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

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What’s Coming</h2>
              <p className="text-xl text-gray-600">New capabilities are being added to help your team do more</p>
            </div>

            <div className="max-w-xl mx-auto">
              <Card data-testid="card-coming-more-channels">
                <CardContent className="pt-6">
                  <span className="inline-flex bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
                    Coming soon
                  </span>
                  <h3 className="text-xl font-semibold mb-2">More Channels</h3>
                  <p className="text-gray-600">
                    Facebook Messenger and Instagram Messaging, alongside WhatsApp and Email, so your team can manage more customer conversations in one place.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-600">Choose the plan that fits your business needs</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card data-testid="pricing-starter">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Starter</h3>
                    <p className="text-gray-600 mb-4">Perfect for small businesses</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">R499</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">WhatsApp number (new or existing)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Unlimited automated workflows</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">1 agent seat</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Escalate conversations to your agent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Basic analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Email support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Pass-through message billing</span>
                    </li>
                  </ul>
                  <a href="#contact">
                    <Button className="w-full" variant="outline" data-testid="button-pricing-starter">
                      Get Started
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="border-green-600 border-2 relative" data-testid="pricing-professional">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Professional</h3>
                    <p className="text-gray-600 mb-4">For growing businesses</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">R999</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3">Everything in Starter, plus:</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">API access &amp; full WhatsApp template triggering — send notifications, forms, carousels, buttons and more from your own systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">System integrations (CRM, accounting &amp; more)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Escalation routing to specific contacts or teams</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Multiple agent seats</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Advanced analytics &amp; insights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Custom branding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Priority email &amp; chat support</span>
                    </li>
                  </ul>
                  <a href="#contact">
                    <Button className="w-full" data-testid="button-pricing-professional">
                      Get Started
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card data-testid="pricing-enterprise">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                    <p className="text-gray-600 mb-4">For large organizations</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">Custom</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Use your existing WhatsApp number</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Unlimited messages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Unlimited automated workflows</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Unlimited agent logins</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Custom integrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Dedicated account manager</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">24/7 phone support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">SLA guarantee</span>
                    </li>
                  </ul>
                  <a href="#contact">
                    <Button className="w-full" variant="outline" data-testid="button-pricing-enterprise">
                      Contact Sales
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center text-sm text-gray-600">
              <p>All plans include a setup and onboarding fee starting at R5,000. The final fee depends on your setup and requirements. Additional messages are charged separately.</p>
              <p className="mt-2">AI Intent Routing and AI Sentiment Analysis are available as optional monthly add-ons. Contact us for add-on pricing.</p>
              <p className="mt-2">Need a custom solution? <a href="#contact" className="text-green-600 hover:underline">Contact us</a> for tailored pricing.</p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-green-600 text-white rounded-2xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Stop Missing Customer Messages</h2>
              <p className="text-xl mb-8 opacity-90">
                Let automation work 24/7 while you stay in control from your dashboard
              </p>
              <a href="#contact">
                <Button size="lg" variant="secondary" data-testid="button-get-started-cta">
                  Get Started Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Automate Your WhatsApp?</h2>
                <p className="text-xl text-gray-600">Tell us about your business and we'll show you how <span className="text-green-600 font-semibold">kwikChat</span> can help</p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Your Name</Label>
                        <Input
                          id="contactName"
                          placeholder="Thabo Mbeki"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          data-testid="input-lead-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="thabo@company.co.za"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          data-testid="input-lead-email"
                        />
                        {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                          <p className="text-sm text-red-500">Please enter a valid email address</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          placeholder="Woolworths, Takealot, etc."
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          data-testid="input-lead-company"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="+27 82 123 4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          data-testid="input-lead-phone"
                        />
                        {formData.phone && !validatePhone(formData.phone) && (
                          <p className="text-sm text-red-500">Please enter a valid SA mobile number (e.g., +27 82 123 4567)</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Your Role</Label>
                        <Input
                          id="role"
                          placeholder="e.g., Operations Manager"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          data-testid="input-lead-role"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Which features are you interested in? *</Label>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {FEATURES.map((feature) => (
                          <label
                            key={feature.id}
                            className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                              formData.selectedFeatures.includes(feature.id)
                                ? 'border-green-600 bg-green-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            data-testid={`checkbox-feature-${feature.id}`}
                          >
                            <Checkbox
                              checked={formData.selectedFeatures.includes(feature.id)}
                              onCheckedChange={() => handleFeatureToggle(feature.id)}
                              className="flex-shrink-0"
                            />
                            <div>
                              <div className="font-medium text-sm">{feature.label}</div>
                              <div className="text-xs text-gray-500">{feature.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Preferred Plan</Label>
                      <div className="flex flex-wrap gap-3">
                        {['Starter', 'Professional', 'Enterprise', 'Not sure yet'].map((plan) => (
                          <button
                            key={plan}
                            type="button"
                            className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                              formData.preferredPlan === plan
                                ? 'border-green-600 bg-green-50 text-green-800'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setFormData({ ...formData, preferredPlan: plan })}
                            data-testid={`button-plan-${plan.toLowerCase().replace(' ', '-')}`}
                          >
                            {plan}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Information</Label>
                      <Textarea
                        id="message"
                        placeholder="e.g., We're a retail chain with 50 stores needing to handle customer enquiries via WhatsApp..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        data-testid="textarea-lead-message"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto"
                      disabled={submitLeadMutation.isPending}
                      data-testid="button-submit-interest"
                    >
                      {submitLeadMutation.isPending ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Submit Interest
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">

            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-6 h-6 text-green-600" />
                <span className="font-bold text-lg">
                  kwik<span className="text-green-600">CHAT</span>
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-3">
                Provided by <span className="font-semibold text-gray-600">Kwik Group (Pty) Ltd</span>
              </p>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                A WhatsApp Business customer communication platform that helps businesses automate and manage their customer conversations via the WhatsApp Business API.
              </p>
              <p className="text-[10px] text-gray-400">
                Powered by{" "}
                <a
                  href="https://intentio.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-600 transition-colors underline underline-offset-2"
                >
                  Intentio Software
                </a>
              </p>
            </div>

            <div className="text-sm text-gray-600 space-y-2">
              <p className="font-semibold text-gray-800 mb-3">Contact</p>
              <a href="mailto:hello@kwikchat.co.za" className="flex items-center gap-2 hover:text-green-600 transition">
                <Mail className="w-4 h-4 flex-shrink-0" />
                hello@kwikchat.co.za
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>105 Club Avenue, Waterkloof Heights,<br />Pretoria, 0181, South Africa</span>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <p className="font-semibold text-gray-800 mb-3">Legal</p>
              <div className="flex flex-col gap-2 text-sm">
                <a href="/privacy-policy" className="hover:text-green-600 underline underline-offset-2 transition-colors">Privacy Policy</a>
                <a href="/terms-of-service" className="hover:text-green-600 underline underline-offset-2 transition-colors">Terms of Service</a>
                <a href="/data-deletion" className="hover:text-green-600 underline underline-offset-2 transition-colors">Data Deletion Instructions</a>
              </div>
            </div>

          </div>

          <div className="border-t mt-10 pt-6 text-xs text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p>© {new Date().getFullYear()} Kwik Group (Pty) Ltd trading as <span className="text-green-600 font-medium">kwikChat</span>. All rights reserved.</p>
            <p>kwikChat is not affiliated with or endorsed by Meta Platforms, Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
