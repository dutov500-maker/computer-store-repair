import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
}

const ShareButton = ({ title, text, url }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);
  
  const shareData = {
    title: title || document.title,
    text: text || 'Компьютерная Лаборатория - сборка и ремонт ПК в Волжском',
    url: url || window.location.href
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('Спасибо за распространение!');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Ошибка при попытке поделиться:', err);
        }
      }
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      toast.success('Ссылка скопирована в буфер обмена');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Не удалось скопировать ссылку');
    }
  };

  const shareToVK = () => {
    const vkUrl = `https://vk.com/share.php?url=${encodeURIComponent(shareData.url)}&title=${encodeURIComponent(shareData.title)}`;
    window.open(vkUrl, '_blank', 'width=600,height=400');
  };

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareData.title + ' ' + shareData.url)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareToTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.title)}`;
    window.open(telegramUrl, '_blank');
  };

  const canShare = navigator.share !== undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 size={16} />
          <span className="hidden sm:inline">Поделиться</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {canShare && (
          <DropdownMenuItem onClick={handleNativeShare}>
            <Share2 size={16} className="mr-2" />
            Поделиться
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={copyToClipboard}>
          {copied ? <Check size={16} className="mr-2 text-green-500" /> : <Share2 size={16} className="mr-2" />}
          {copied ? 'Скопировано!' : 'Копировать ссылку'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareToVK}>
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.066 13.65c.478.48 1.012.95 1.426 1.483.186.24.362.49.497.77.192.397.018.833-.312.857l-2.054.003c-.528.043-1.003-.166-1.398-.56-.313-.313-.605-.645-.906-.97-.126-.136-.258-.264-.41-.372-.346-.245-.648-.178-.843.186-.2.372-.246.78-.27 1.188-.03.55-.226.694-.777.716-1.176.048-2.29-.125-3.32-.74-1.007-.6-1.797-1.407-2.496-2.315-.986-1.282-1.746-2.692-2.424-4.142-.145-.31-.04-.476.302-.484.568-.013 1.136-.012 1.705 0 .232.005.387.133.486.348.41.892.89 1.74 1.473 2.525.156.21.312.42.527.574.243.175.43.12.548-.16.076-.18.11-.373.127-.565.055-.632.063-1.264-.014-1.895-.044-.36-.256-.594-.615-.66-.184-.034-.157-.1-.068-.2.173-.193.336-.313.662-.313h2.44c.386.076.472.25.523.638l.002 2.72c-.004.15.075.596.347.694.218.075.363-.108.494-.245.59-.616 1.01-1.344 1.385-2.1.166-.334.308-.68.447-1.025.104-.256.265-.383.555-.376l2.273.003c.067 0 .135.002.2.015.385.075.49.264.375.64-.18.59-.52 1.084-.86 1.578-.358.52-.745 1.02-1.107 1.538-.33.474-.303.71.105 1.13z"/>
          </svg>
          ВКонтакте
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareToWhatsApp}>
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareToTelegram}>
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.492-1.302.486-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.154.232.17.326.016.094.037.308.021.475z"/>
          </svg>
          Telegram
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;
