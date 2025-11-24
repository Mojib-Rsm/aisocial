
import React, { useState } from 'react';
import { useLanguage } from '../App';
import { Copy, Check, Type } from 'lucide-react';

const FONTS = {
    bold: (text: string) => text.replace(/[a-zA-Z0-9]/g, (char) => {
        const code = char.charCodeAt(0);
        if (code >= 48 && code <= 57) return String.fromCodePoint(code + 120734);
        if (code >= 65 && code <= 90) return String.fromCodePoint(code + 119743);
        if (code >= 97 && code <= 122) return String.fromCodePoint(code + 119737);
        return char;
    }),
    italic: (text: string) => text.replace(/[a-zA-Z]/g, (char) => {
         const code = char.charCodeAt(0);
         if (code === 104) return 'ℎ';
         if (code >= 65 && code <= 90) return String.fromCodePoint(code + 119795);
         if (code >= 97 && code <= 122) return String.fromCodePoint(code + 119789);
         return char;
    }),
    monospace: (text: string) => text.replace(/[a-zA-Z0-9]/g, (char) => {
        const code = char.charCodeAt(0);
        if (code >= 48 && code <= 57) return String.fromCodePoint(code + 104638);
        if (code >= 65 && code <= 90) return String.fromCodePoint(code + 104615);
        if (code >= 97 && code <= 122) return String.fromCodePoint(code + 104609);
        return char;
    }),
    script: (text: string) => text.replace(/[a-zA-Z]/g, (char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(code + 119951);
        if (code >= 97 && code <= 122) return String.fromCodePoint(code + 119945);
        return char;
    }),
    doubleStruck: (text: string) => text.replace(/[a-zA-Z0-9]/g, (char) => {
        const code = char.charCodeAt(0);
        if (code >= 48 && code <= 57) return String.fromCodePoint(code + 120744);
        if (code >= 65 && code <= 90) return String.fromCodePoint(code + 120055);
        if (code >= 97 && code <= 122) return String.fromCodePoint(code + 120049);
        return char;
    }),
    circled: (text: string) => text.replace(/[a-zA-Z0-9]/g, (char) => {
        const code = char.charCodeAt(0);
        if (code >= 48 && code <= 57) return String.fromCodePoint(code + 9399); // 0 is tricky in this range but mostly works
        if (code >= 65 && code <= 90) return String.fromCodePoint(code + 9333);
        if (code >= 97 && code <= 122) return String.fromCodePoint(code + 9327);
        return char;
    }),
    smallCaps: (text: string) => {
       const map: {[key: string]: string} = {a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ꜰ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ꞯ',r:'ʀ',s:'ꜱ',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ'};
       return text.split('').map(c => map[c.toLowerCase()] || c).join('');
    }
};

const FontGenerator: React.FC = () => {
    const { t } = useLanguage();
    const [inputText, setInputText] = useState('');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const fontStyles = [
        { name: 'Bold', fn: FONTS.bold },
        { name: 'Italic', fn: FONTS.italic },
        { name: 'Monospace', fn: FONTS.monospace },
        { name: 'Script', fn: FONTS.script },
        { name: 'Double Struck', fn: FONTS.doubleStruck },
        { name: 'Circled', fn: FONTS.circled },
        { name: 'Small Caps', fn: FONTS.smallCaps },
    ];

    return (
        <div className="max-w-2xl mx-auto">
             <div className="bg-surface p-6 rounded-xl shadow-lg mb-8">
                 <h2 className="text-2xl font-bold text-textPrimary mb-6 flex items-center gap-2">
                     <Type className="text-primary" /> {t('fontGenerator')}
                 </h2>
                 <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t('enterText')}
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary text-lg h-32 mb-6"
                 />
                 
                 <div className="space-y-4">
                     {fontStyles.map((style, index) => {
                         const previewText = inputText ? style.fn(inputText) : style.fn(t('fontPreview'));
                         return (
                             <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-lg flex items-center justify-between group hover:border-primary/50 transition-colors">
                                 <div>
                                     <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">{style.name}</p>
                                     <p className="text-xl text-textPrimary break-all">{previewText}</p>
                                 </div>
                                 <button
                                    onClick={() => handleCopy(previewText, index)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                                        copiedIndex === index ? 'bg-green-100 text-green-700' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                                    }`}
                                 >
                                     {copiedIndex === index ? <Check size={16} /> : <Copy size={16} />}
                                     {copiedIndex === index ? t('copied') : t('copy')}
                                 </button>
                             </div>
                         );
                     })}
                 </div>
             </div>
        </div>
    );
};

export default FontGenerator;
