import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Building, Phone, Mail, CheckCircle, Users } from 'lucide-react';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  organizationName: z.string().min(1, { message: "Organization name is required" }),
  contactName: z.string().min(1, { message: "Contact name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().optional(),
  partnershipType: z.string().min(1, { message: "Please select a partnership type" }),
});

type FormValues = z.infer<typeof formSchema>;

const PartnerForm = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationName: '',
      contactName: '',
      email: '',
      phone: '',
      partnershipType: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return await apiRequest('POST', '/api/partner-applications', data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: t('forms.partner.successTitle'),
        description: t('forms.partner.successMessage'),
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: t('forms.partner.errorTitle'),
        description: t('forms.partner.errorMessage'),
        variant: 'destructive',
      });
      console.error(error);
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2 p-8">
          {isSubmitted ? (
            <div className="text-center py-6">
              <CheckCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-xl mb-2">{t('forms.partner.thankyouTitle')}</h3>
              <p className="text-gray-600 mb-4">{t('forms.partner.thankyouMessage')}</p>
              <Button onClick={() => setIsSubmitted(false)}>
                {t('forms.partner.submitAnother')}
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <h2 className="font-heading font-bold text-2xl mb-6 text-primary">{t('forms.partner.title')}</h2>
                
                <FormField
                  control={form.control}
                  name="organizationName"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{t('forms.partner.orgName')} *</FormLabel>
                      <FormControl>
                        <Input placeholder={t('forms.partner.orgNamePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{t('forms.partner.contactName')} *</FormLabel>
                      <FormControl>
                        <Input placeholder={t('forms.partner.contactNamePlaceholder')} {...field} />
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
                      <FormLabel>{t('forms.partner.email')} *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder={t('forms.partner.emailPlaceholder')} {...field} />
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
                      <FormLabel>{t('forms.partner.phone')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('forms.partner.phonePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="partnershipType"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>{t('forms.partner.partnershipType')} *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('forms.partner.partnershipTypePlaceholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="project">{t('forms.partner.partnershipTypes.project')}</SelectItem>
                          <SelectItem value="sponsor">{t('forms.partner.partnershipTypes.sponsor')}</SelectItem>
                          <SelectItem value="information">{t('forms.partner.partnershipTypes.information')}</SelectItem>
                          <SelectItem value="other">{t('forms.partner.partnershipTypes.other')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? t('forms.submitting') : t('forms.partner.submit')}
                </Button>
              </form>
            </Form>
          )}
        </div>
        
        <div className="md:w-1/2 bg-secondary p-8 text-white">
          <h2 className="font-heading font-bold text-2xl mb-4">{t('forms.partner.benefits.title')}</h2>
          <p className="mb-6">{t('forms.partner.benefits.description')}</p>
          
          <div className="mb-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <Users className="text-xl mt-1 mr-3" />
                <div>
                  <h3 className="font-semibold mb-1">{t('forms.partner.benefits.benefit1.title')}</h3>
                  <p className="text-sm">{t('forms.partner.benefits.benefit1.description')}</p>
                </div>
              </li>
              <li className="flex items-start">
                <Building className="text-xl mt-1 mr-3" />
                <div>
                  <h3 className="font-semibold mb-1">{t('forms.partner.benefits.benefit2.title')}</h3>
                  <p className="text-sm">{t('forms.partner.benefits.benefit2.description')}</p>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="text-xl mt-1 mr-3" />
                <div>
                  <h3 className="font-semibold mb-1">{t('forms.partner.benefits.benefit3.title')}</h3>
                  <p className="text-sm">{t('forms.partner.benefits.benefit3.description')}</p>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="text-xl mt-1 mr-3" />
                <div>
                  <h3 className="font-semibold mb-1">{t('forms.partner.benefits.benefit4.title')}</h3>
                  <p className="text-sm">{t('forms.partner.benefits.benefit4.description')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerForm;
