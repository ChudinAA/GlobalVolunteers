import { ProjectCategory } from '@shared/schema';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { getCategoryColor } from '@/lib/utils';

interface BadgeProps {
  category: string;
  className?: string;
}

export const Badge = ({ category, className }: BadgeProps) => {
  const { t } = useTranslation();
  const { bgColor, textColor } = getCategoryColor(category);
  
  const getCategoryName = () => {
    switch (category) {
      case ProjectCategory.MEDICAL:
        return t('categories.medical');
      case ProjectCategory.EDUCATION:
        return t('categories.education');
      case ProjectCategory.SPORTS:
        return t('categories.sports');
      case ProjectCategory.ENVIRONMENT:
        return t('categories.environment');
      default:
        return category;
    }
  };

  return (
    <span className={cn(
      "px-2 py-1 text-xs rounded-full",
      bgColor,
      textColor,
      className
    )}>
      {getCategoryName()}
    </span>
  );
};
