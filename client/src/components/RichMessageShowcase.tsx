import { useEffect, useRef, useState } from 'react';
import {
  Building2,
  ChevronLeft,
  FileText,
  Image as ImageIcon,
  List,
  MapPin,
  Phone,
  Play,
  Video,
} from 'lucide-react';

type MessagePreview =
  | {
      type: 'text';
      eyebrow: string;
      title: string;
      body: string;
    }
  | {
      type: 'buttons';
      eyebrow: string;
      title: string;
      body: string;
      buttons: string[];
    }
  | {
      type: 'list';
      eyebrow: string;
      title: string;
      body: string;
      action: string;
    }
  | {
      type: 'structured';
      eyebrow: string;
      title: string;
      fields: string[];
      footer: string;
    }
  | {
      type: 'form';
      eyebrow: string;
      title: string;
      fields: string[];
      action: string;
    }
  | {
      type: 'carousel';
      eyebrow: string;
      title: string;
      items: { name: string; detail: string }[];
    }
  | {
      type: 'media';
      eyebrow: string;
      title: string;
      body: string;
      mediaLabel: string;
    };

const MESSAGE_PREVIEWS: MessagePreview[] = [
  {
    type: 'buttons',
    eyebrow: 'Welcome journey',
    title: 'Quick-reply buttons',
    body: 'Hi! Welcome to Kwik Fitness Studio. How can we help today?',
    buttons: ['Book a class', 'Class schedule', 'Membership info'],
  },
  {
    type: 'list',
    eyebrow: 'Guided choice',
    title: 'List picker',
    body: 'Great! Which class would you like to book?',
    action: 'View class options',
  },
  {
    type: 'text',
    eyebrow: 'Instant confirmation',
    title: 'Booking confirmed',
    body: "You're booked! We've reserved your spot and scheduled a reminder one hour before class.",
  },
  {
    type: 'text',
    eyebrow: 'Proactive notification',
    title: 'Smart reminder',
    body: 'Reminder: your class starts at 17:30 today. Reply here if you need to reschedule.',
  },
  {
    type: 'structured',
    eyebrow: 'Human escalation',
    title: 'Lead alert',
    fields: ['Customer: Jordan M.', 'WhatsApp: +27 82 000 0000', 'Intent: New membership', 'Priority: High'],
    footer: 'Open kwikChat to respond with the full conversation context.',
  },
  {
    type: 'form',
    eyebrow: 'WhatsApp Flow',
    title: 'Capture details in-chat',
    fields: ['Preferred date', 'Service type', 'Contact details'],
    action: 'Continue',
  },
  {
    type: 'carousel',
    eyebrow: 'Rich product discovery',
    title: 'Interactive carousel',
    items: [
      { name: 'Starter Plan', detail: 'For small teams' },
      { name: 'Professional', detail: 'For growing teams' },
      { name: 'Enterprise', detail: 'Built around you' },
    ],
  },
  {
    type: 'media',
    eyebrow: 'Rich media update',
    title: 'Delivery on the way',
    body: 'Your order has left our store. Track the driver live or view your invoice.',
    mediaLabel: 'Live delivery map',
  },
];

type LiveMessage =
  | { from: 'customer' | 'business'; type: 'text'; body: string }
  | { from: 'business'; type: 'list'; body: string; options: string[] }
  | { from: 'business'; type: 'buttons'; title: string; body: string; buttons: string[] }
  | { from: 'business'; type: 'media'; title: string; body: string };

const LIVE_MESSAGES: LiveMessage[] = [
  { from: 'customer', type: 'text', body: 'Hi! I need help with a burst pipe.' },
  { from: 'business', type: 'text', body: "Hi there! I'm here to help. What type of service do you need?" },
  {
    from: 'business',
    type: 'list',
    body: 'Choose a service to continue:',
    options: ['Burst pipe repair', 'Blocked drain', 'Geyser issue', 'Other'],
  },
  { from: 'customer', type: 'text', body: 'Burst pipe repair' },
  {
    from: 'business',
    type: 'buttons',
    title: 'Emergency repair',
    body: 'Average response time: 2 hours',
    buttons: ['Book now', 'Get a quote'],
  },
  { from: 'customer', type: 'text', body: 'Book now' },
  {
    from: 'business',
    type: 'media',
    title: 'Technician en route',
    body: 'Tap to view the live location.',
  },
  {
    from: 'business',
    type: 'text',
    body: 'Confirmed. Ref #PL-2847. Your plumber arrives tomorrow between 08:00 and 10:00.',
  },
];

function WhatsAppHeader() {
  return (
    <div className="rich-preview-header">
      <ChevronLeft aria-hidden="true" />
      <div className="rich-preview-avatar">
        <Building2 aria-hidden="true" />
      </div>
      <div>
        <strong>Your Business</strong>
        <span>online</span>
      </div>
      <Video className="rich-preview-header-action" aria-hidden="true" />
      <Phone className="rich-preview-header-action" aria-hidden="true" />
    </div>
  );
}

function MessageContent({ preview }: { preview: MessagePreview }) {
  if (preview.type === 'buttons') {
    return (
      <div className="rich-preview-bubble rich-preview-bubble-interactive">
        <p>{preview.body}</p>
        <div className="rich-preview-actions">
          {preview.buttons.map((button) => (
            <span key={button}>{button}</span>
          ))}
        </div>
      </div>
    );
  }

  if (preview.type === 'list') {
    return (
      <div className="rich-preview-bubble rich-preview-bubble-interactive">
        <p>{preview.body}</p>
        <div className="rich-preview-list-action">
          <List aria-hidden="true" />
          <span>{preview.action}</span>
        </div>
      </div>
    );
  }

  if (preview.type === 'structured') {
    return (
      <div className="rich-preview-bubble">
        <strong>New chatbot escalation</strong>
        <div className="rich-preview-fields">
          {preview.fields.map((field) => (
            <span key={field}>{field}</span>
          ))}
        </div>
        <small>{preview.footer}</small>
      </div>
    );
  }

  if (preview.type === 'form') {
    return (
      <div className="rich-preview-flow">
        <div className="rich-preview-flow-heading">
          <FileText aria-hidden="true" />
          <span>Complete your booking</span>
        </div>
        {preview.fields.map((field) => (
          <div className="rich-preview-field" key={field}>
            <span>{field}</span>
            <i />
          </div>
        ))}
        <button type="button" tabIndex={-1}>{preview.action}</button>
      </div>
    );
  }

  if (preview.type === 'carousel') {
    return (
      <div className="rich-preview-carousel">
        <p>Choose the option that fits your business:</p>
        <div className="rich-preview-carousel-track">
          {preview.items.map((item, index) => (
            <div className="rich-preview-product" key={item.name}>
              <div className={`rich-preview-product-art rich-preview-product-art-${index + 1}`}>
                <ImageIcon aria-hidden="true" />
              </div>
              <strong>{item.name}</strong>
              <small>{item.detail}</small>
              <span>View details</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (preview.type === 'media') {
    return (
      <div className="rich-preview-media">
        <div className="rich-preview-media-art">
          <MapPin aria-hidden="true" />
          <span>{preview.mediaLabel}</span>
        </div>
        <div className="rich-preview-media-copy">
          <strong>{preview.title}</strong>
          <p>{preview.body}</p>
          <div>
            <span>Track order</span>
            <span>View invoice</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rich-preview-bubble">
      <p>{preview.body}</p>
    </div>
  );
}

function LiveMessageContent({ message }: { message: LiveMessage }) {
  if (message.type === 'list') {
    return (
      <div className="rich-live-bubble rich-live-bubble-interactive">
        <p>{message.body}</p>
        <div className="rich-live-options">
          {message.options.map((option) => (
            <span key={option}>
              {option}
              <i>›</i>
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (message.type === 'buttons') {
    return (
      <div className="rich-live-bubble rich-live-bubble-interactive">
        <div className="rich-live-service-art">
          <Phone aria-hidden="true" />
        </div>
        <div className="rich-live-service-copy">
          <strong>{message.title}</strong>
          <p>{message.body}</p>
        </div>
        <div className="rich-live-options rich-live-buttons">
          {message.buttons.map((button) => (
            <span key={button}>{button}</span>
          ))}
        </div>
      </div>
    );
  }

  if (message.type === 'media') {
    return (
      <div className="rich-live-bubble rich-live-media">
        <div className="rich-live-map">
          <MapPin aria-hidden="true" />
          <span>Live location</span>
        </div>
        <strong>{message.title}</strong>
        <p>{message.body}</p>
      </div>
    );
  }

  return <div className="rich-live-bubble">{message.body}</div>;
}

export function LiveAutomationDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    const timeouts: number[] = [];

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleMessages(LIVE_MESSAGES.length);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        setVisibleMessages(0);
        const delays = [350, 1050, 1800, 2700, 3500, 4400, 5200, 6100];

        delays.forEach((delay, index) => {
          timeouts.push(window.setTimeout(() => {
            setVisibleMessages(index + 1);
            timeouts.push(window.setTimeout(() => {
              if (chatRef.current) {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
              }
            }, 60));
          }, delay));
        });
      },
      { threshold: 0.3 },
    );

    if (demoRef.current) observer.observe(demoRef.current);

    return () => {
      observer.disconnect();
      timeouts.forEach(window.clearTimeout);
    };
  }, []);

  return (
    <div ref={demoRef} className="rich-preview-phone rich-live-phone">
      <WhatsAppHeader />
      <div ref={chatRef} className="rich-preview-chat rich-live-chat" aria-live="polite">
        {LIVE_MESSAGES.map((message, index) => {
          const visible = index < visibleMessages;
          return (
            <div
              className={`rich-live-message-row ${message.from === 'customer' ? 'rich-live-message-customer' : ''}`}
              key={`${message.type}-${index}`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(8px)',
              }}
            >
              <LiveMessageContent message={message} />
              <time>12:00</time>
            </div>
          );
        })}
        {visibleMessages > 0 && visibleMessages < LIVE_MESSAGES.length && (
          <div className="rich-live-typing" aria-label="Business is typing">
            <i />
            <i />
            <i />
          </div>
        )}
      </div>
    </div>
  );
}

export function RichMessageShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !viewport || !track) return;

    let frame = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 767px)');

    const update = () => {
      frame = 0;

      if (reducedMotion.matches || mobile.matches) {
        track.style.removeProperty('transform');
        Array.from(track.children).forEach((card) => {
          (card as HTMLElement).style.removeProperty('transform');
        });
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1);
      const maxShift = Math.max(track.scrollWidth - viewport.clientWidth + 32, 0);

      track.style.transform = `translate3d(${-progress * maxShift}px, 0, 0)`;

      Array.from(track.children).forEach((card, index) => {
        const phase = progress * Math.PI * 2 + index * 0.78;
        const lift = Math.sin(phase) * 10;
        const tilt = Math.sin(phase * 0.7) * 1.5;
        (card as HTMLElement).style.transform = `translateY(${lift}px) rotate(${tilt}deg)`;
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(section);
    resizeObserver.observe(track);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reducedMotion.addEventListener('change', requestUpdate);
    mobile.addEventListener('change', requestUpdate);
    update();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reducedMotion.removeEventListener('change', requestUpdate);
      mobile.removeEventListener('change', requestUpdate);
    };
  }, []);

  return (
    <section ref={sectionRef} className="rich-message-showcase" aria-labelledby="rich-message-title">
      <div className="rich-message-sticky">
        <div className="container mx-auto px-4">
          <div className="rich-message-heading">
            <div>
              <span>Built for WhatsApp</span>
              <h2 id="rich-message-title" className="site-section-title">Every message can do more</h2>
            </div>
            <p>
              Scroll through real examples generated from the same message types kwikChat uses:
              notifications, lists, buttons, forms, carousels, media, and human escalation.
            </p>
          </div>
        </div>

        <div ref={viewportRef} className="rich-message-viewport">
          <div ref={trackRef} className="rich-message-track">
            {MESSAGE_PREVIEWS.map((preview) => (
              <article className="rich-message-card" key={preview.title}>
                <div className="rich-preview-phone">
                  <WhatsAppHeader />
                  <div className="rich-preview-chat">
                    <MessageContent preview={preview} />
                    <time>12:00 PM</time>
                  </div>
                </div>
                <div className="rich-message-card-caption">
                  <span>{preview.eyebrow}</span>
                  <h3>{preview.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rich-message-mobile-hint">
          <Play aria-hidden="true" />
          Swipe to explore message types
        </div>
      </div>
    </section>
  );
}