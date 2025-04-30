import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(1, { message: "Message is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // React Hook Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  // Form submission mutation
  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return await apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: t('forms.contact.successTitle'),
        description: t('forms.contact.successMessage'),
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: t('forms.contact.errorTitle'),
        description: t('forms.contact.errorMessage'),
        variant: 'destructive',
      });
      console.error(error);
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  // Social media links
  const socialLinks = [
    { Icon: Facebook, href: 'https://facebook.com', label: t('contact.social.facebook') },
    { Icon: Twitter, href: 'https://twitter.com', label: t('contact.social.twitter') },
    { Icon: Instagram, href: 'https://instagram.com', label: t('contact.social.instagram') },
    { Icon: Linkedin, href: 'https://linkedin.com', label: t('contact.social.linkedin') },
  ];

  return (
    <>
      <Helmet>
        <title>{t('contact.meta.title')}</title>
        <meta name="description" content={t('contact.meta.description')} />
      </Helmet>

      <div className="pt-24 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="font-heading font-bold text-4xl mb-6 text-center">
            {t('contact.title')}
          </h1>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            {t('contact.description')}
          </p>

          <div className="grid md:grid-cols-12 gap-8 mb-12">
            {/* Contact Information */}
            <div className="md:col-span-4">
              <Card className="h-full">
                <CardContent className="p-6">
                  <h2 className="font-heading font-semibold text-xl mb-6 text-primary">
                    {t('contact.info.title')}
                  </h2>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <MapPin className="text-primary mt-1 mr-3" size={20} />
                      <span className="text-gray-700">{t('contact.info.address')}</span>
                    </li>
                    <li className="flex items-start">
                      <Phone className="text-primary mt-1 mr-3" size={20} />
                      <span className="text-gray-700">{t('contact.info.phone')}</span>
                    </li>
                    <li className="flex items-start">
                      <Mail className="text-primary mt-1 mr-3" size={20} />
                      <span className="text-gray-700">{t('contact.info.email')}</span>
                    </li>
                    <li className="flex items-start">
                      <Clock className="text-primary mt-1 mr-3" size={20} />
                      <span className="text-gray-700">{t('contact.info.workingHours')}</span>
                    </li>
                  </ul>

                  <div className="mt-8">
                    <h3 className="font-heading font-semibold mb-4">
                      {t('contact.social.title')}
                    </h3>
                    <div className="flex space-x-4">
                      {socialLinks.map(({ Icon, href, label }, index) => (
                        <a 
                          key={index}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-primary transition-colors"
                          aria-label={label}
                        >
                          <Icon size={20} />
                        </a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-8">
              <Card>
                <CardContent className="p-6">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="font-heading font-semibold text-2xl mb-2">
                        {t('forms.contact.successTitle')}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {t('forms.contact.successMessage')}
                      </p>
                      <Button onClick={() => setIsSubmitted(false)}>
                        {t('forms.contact.submit')}
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-heading font-semibold text-xl mb-6 text-primary">
                        {t('contact.form.title')}
                      </h2>
                      
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{t('forms.contact.name')} *</FormLabel>
                                  <FormControl>
                                    <Input placeholder={t('forms.contact.namePlaceholder')} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{t('forms.contact.email')} *</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder={t('forms.contact.emailPlaceholder')} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('forms.contact.subject')} *</FormLabel>
                                <FormControl>
                                  <Input placeholder={t('forms.contact.subjectPlaceholder')} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('forms.contact.message')} *</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder={t('forms.contact.messagePlaceholder')} 
                                    rows={6}
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            className="w-full md:w-auto"
                            disabled={mutation.isPending}
                          >
                            {mutation.isPending ? t('forms.submitting') : t('forms.contact.submit')}
                          </Button>
                        </form>
                      </Form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <div className="mb-12">
            <h2 className="font-heading font-semibold text-xl mb-4 text-center">
              {t('contact.map.title')}
            </h2>
            <div className="h-96 rounded-lg overflow-hidden shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.347125124052!2d37.6173!3d55.7504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2sRed%20Square!5e0!3m2!1sen!2sus!4v1671143962!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('contact.map.title')}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
