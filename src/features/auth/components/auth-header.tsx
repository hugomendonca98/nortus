'use client'

import { useState } from 'react'
import { ArrowDownIcon } from '@/components/icons/arrow-down'
import { HeadphoneIcon } from '@/components/icons/headphone-icon'
import { Logo } from '@/components/logo/logo'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'

export const AuthHeader = () => {
  const [language, setLanguage] = useState('pt-br')

  return (
    <div className="mb-12 fixed top-0 left-0 right-0 z-10 flex-col flex md:flex-row justify-between items-center bg-transparent py-10 px-16">
      <Logo className="w-24 md:w-32 lg:w-40" />

      <div className="flex items-center space-x-4 -mr-4 mt-8 md:mt-0">
        {/* Help Button */}
        <Button className="bg-[#f6f8fc0a] hover:bg-[#f6f8fc1a] text-white rounded-full transition-all duration-200 font-medium p-6 !px-6 py-6 flex items-center shadow-[0_1px_0_0_rgba(0,0,0,0.05),_0_4px_4px_0_rgba(0,0,0,0.05),_0_10px_10px_0_rgba(0,0,0,0.10);] gap-2 cursor-pointer border-none">
          <HeadphoneIcon className="w-5 h-5" />
          Ajuda
        </Button>

        {/* Language Selector */}
        <div className="flex items-center space-x-2">
          <Select
            defaultValue="pt-br"
            onValueChange={(value) => setLanguage(value)}
          >
            <Button
              className="bg-[#f6f8fc0a] hover:bg-[#f6f8fc1a] text-white rounded-full transition-all duration-200 font-medium p-6 !px-6 py-6 flex items-center shadow-[0_1px_0_0_rgba(0,0,0,0.05),_0_4px_4px_0_rgba(0,0,0,0.05),_0_10px_10px_0_rgba(0,0,0,0.10);] gap-2 cursor-pointer border-none"
              asChild
            >
              <SelectTrigger
                hiddenIcon
                className="border-none w-full h-full rounded-full cursor-pointer"
              >
                <ArrowDownIcon className="w-4 h-4 text-white" />
                {language === 'pt-br' ? (
                  <Image
                    src="/images/brasil-icon.png"
                    alt="PT-br"
                    width={17}
                    height={17}
                    className="w-[17px] h-[17px]"
                    quality={100}
                  />
                ) : (
                  <Image
                    src="/images/eua-icon.png"
                    alt="EN-US"
                    width={17}
                    height={17}
                    className="w-[17px] h-[17px]"
                    quality={100}
                  />
                )}
                <SelectValue placeholder="PT-br" />
              </SelectTrigger>
            </Button>

            <SelectContent>
              <SelectItem value="pt-br">PT-br</SelectItem>
              <SelectItem value="en-us">EN-us</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
