import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { ProjectCategory } from '@shared/schema';
import { Heart, CheckCircle } from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().optional(),
  interestedCategory: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const VolunteerForm = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      interestedCategory: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return await apiRequest('POST', '/api/volunteer-applications', data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: t('forms.volunteer.successTitle'),
        description: t('forms.volunteer.successMessage'),
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: t('forms.volunteer.errorTitle'),
        description: t('forms.volunteer.errorMessage'),
        variant: 'destructive',
      });
      console.error(error);
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2 bg-primary p-8 text-white">
          <h2 className="font-heading font-bold text-2xl mb-4">{t('forms.volunteer.title')}</h2>
          <p className="mb-6">{t('forms.volunteer.description')}</p>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">{t('forms.volunteer.benefits.title')}</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Heart className="mt-1 mr-2" size={16} />
                <span>{t('forms.volunteer.benefits.benefit1')}</span>
              </li>
              <li className="flex items-start">
                <Heart className="mt-1 mr-2" size={16} />
                <span>{t('forms.volunteer.benefits.benefit2')}</span>
              </li>
              <li className="flex items-start">
                <Heart className="mt-1 mr-2" size={16} />
                <span>{t('forms.volunteer.benefits.benefit3')}</span>
              </li>
              <li className="flex items-start">
                <Heart className="mt-1 mr-2" size={16} />
                <span>{t('forms.volunteer.benefits.benefit4')}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <img 
              src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
              alt={t('forms.volunteer.imageAlt')} 
              className="rounded-lg"
            />
          </div>
        </div>
        
        <div className="md:w-1/2 p-8">
          {isSubmitted ? (
            <div className="text-center py-6">
              <CheckCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-xl mb-2">{t('forms.volunteer.thankyouTitle')}</h3>
              <p className="text-gray-600 mb-4">{t('forms.volunteer.thankyouMessage')}</p>
              <Button onClick={() => setIsSubmitted(false)}>
                {t('forms.volunteer.submitAnother')}
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{t('forms.volunteer.name')} *</FormLabel>
                      <FormControl>
                        <Input placeholder={t('forms.volunteer.namePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{t('forms.volunteer.email')} *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder={t('forms.volunteer.emailPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{t('forms.volunteer.phone')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('forms.volunteer.phonePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="interestedCategory"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{t('forms.volunteer.category')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('forms.volunteer.categoryPlaceholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">{t('forms.volunteer.categoryNone')}</SelectItem>
                          <SelectItem value={ProjectCategory.MEDICAL}>{t('categories.medical')}</SelectItem>
                          <SelectItem value={ProjectCategory.EDUCATION}>{t('categories.education')}</SelectItem>
                          <SelectItem value={ProjectCategory.SPORTS}>{t('categories.sports')}</SelectItem>
                          <SelectItem value={ProjectCategory.ENVIRONMENT}>{t('categories.environment')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>{t('forms.volunteer.message')}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={t('forms.volunteer.messagePlaceholder')} 
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? t('forms.submitting') : t('forms.volunteer.submit')}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerForm;
