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
} from 'lucide-react';

const FEATURES = [
  { id: 'rule-based', label: 'Rule-Based Conversations', description: 'Automated flows & triggers' },
  { id: 'ai-conversations', label: 'AI Conversations', description: 'Intelligent chat responses' },
  { id: 'human-handover', label: 'Human Intervention', description: 'Seamless agent handoff' },
  { id: 'campaigns', label: 'Marketing Campaigns', description: 'Business-initiated messaging' },
  { id: 'omnichannel', label: 'Omnichannel Messaging', description: 'WhatsApp, Email (FB & IG coming soon)' },
  { id: 'integrations', label: 'System Integrations', description: 'Connect CRM, Accounting & more' },
  { id: 'analytics', label: 'Analytics Dashboard', description: 'Conversation insights' },
  { id: 'multi-user', label: 'Multi-User Access', description: 'Team collaboration' },
  { id: 'custom-branding', label: 'Custom Branding', description: 'White-label options' },
];

export default function Home() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
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
          <div className="flex items-center gap-2">
            <MessageCircle className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold">
              kwik<span className="text-green-600">CHAT</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-sm font-medium hover:text-green-600 transition">Features</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-green-600 transition">How It Works</a>
            <a href="#pricing" className="text-sm font-medium hover:text-green-600 transition">Pricing</a>
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
              <p className="text-green-600 font-semibold mb-4 uppercase tracking-wide">For businesses running on WhatsApp</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Your WhatsApp, Supercharged
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Running your business on WhatsApp? Automate customer interactions — from enquiries and onboarding to quotes, status updates, and job notifications — while keeping the ability to jump in personally from one central dashboard.
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

        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Automation + Human Touch</h2>
              <p className="text-xl text-gray-600">Let automation handle the repetitive stuff while you focus on what matters</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card data-testid="card-feature-automation">
                <CardContent className="pt-6">
                  <Bot className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Automated Business Workflows</h3>
                  <p className="text-gray-600">
                    Automate your entire customer journey — from answering FAQs and capturing leads, to customer onboarding, quote requests, order confirmations, and delivery updates. Stop repeating yourself and let automation handle the routine.
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-feature-human">
                <CardContent className="pt-6">
                  <Users className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Jump In Anytime</h3>
                  <p className="text-gray-600">
                    Need to give a customer the personal touch? Seamlessly take over any conversation from your dashboard with full context of what's been said
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-feature-realtime">
                <CardContent className="pt-6">
                  <Zap className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">One Dashboard</h3>
                  <p className="text-gray-600">
                    See all your WhatsApp conversations in one place — no more scrolling through your phone all day
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-feature-sessions">
                <CardContent className="pt-6">
                  <MessageSquare className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Never Miss a Message</h3>
                  <p className="text-gray-600">
                    Track every conversation with timestamps and history — know exactly where you left off
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-feature-analytics">
                <CardContent className="pt-6">
                  <BarChart3 className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Know Your Numbers</h3>
                  <p className="text-gray-600">
                    Track chat volumes, response times, resolution rates, and automation performance. Spot where customers get stuck and optimise your flows with real insights
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-feature-configuration">
                <CardContent className="pt-6">
                  <Settings className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Guided Setup</h3>
                  <p className="text-gray-600">
                    No technical skills needed — our team will walk you through the entire setup and onboarding process to get you up and running
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
                  <h3 className="text-xl font-semibold mb-2">We Connect Your WhatsApp Number</h3>
                  <p className="text-gray-600">
                    Our team will help you connect a new or existing WhatsApp Business number. We handle the technical setup so you don't have to.
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
                  <h3 className="text-xl font-semibold mb-2">You're In Control</h3>
                  <p className="text-gray-600">
                    Monitor all conversations from your dashboard. Let automation handle the routine while you jump in whenever a personal touch is needed.
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
                      <span className="text-4xl font-bold">TBD</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">New WhatsApp Business number</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Up to 1,000 messages/month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">3 automated workflows</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">1 agent login</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Basic analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Email support</span>
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
                      <span className="text-4xl font-bold">TBD</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Use your existing WhatsApp number</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Up to 5,000 messages/month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Unlimited automated workflows</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Multiple agent logins</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Advanced analytics & insights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Priority email & chat support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Custom branding</span>
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
              <p>All plans include a once-off setup and onboarding fee.</p>
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
                            className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                              formData.selectedFeatures.includes(feature.id)
                                ? 'border-green-600 bg-green-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            data-testid={`checkbox-feature-${feature.id}`}
                          >
                            <Checkbox
                              checked={formData.selectedFeatures.includes(feature.id)}
                              onCheckedChange={() => handleFeatureToggle(feature.id)}
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-green-600" />
              <span className="font-bold">
                kwik<span className="text-green-600">CHAT</span>
              </span>
            </div>
            <div className="text-sm text-gray-600 text-center md:text-right">
              <p>© 2025 Kwik Group (Pty) Ltd trading as <span className="text-green-600 font-semibold">kwikChat</span></p>
              <p className="mt-1">All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
