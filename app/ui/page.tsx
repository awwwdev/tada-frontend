"use client";

import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import LinkButton from "@/components/ui/Button/LinkButton";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Space from "@/components/ui/Space";
import TextArea from "@/components/ui/TextArea";
import ToggleGroup from "@/components/ui/ToggleGroup";
import { Settings } from "@/types";
import { useId, useState } from "react";

import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import { To } from 'devextreme-react/cjs/autocomplete';
import { ButtonProps } from '@/components/ui/Button/types';

export default function Page() {
  const [theme, setTheme] = useState<Settings["theme"]>("light");
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [value, setValue] = useState("some value");
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [variant , setVariant] = useState<ButtonProps["variant"]>("ghost");

  return (
    <div className="max-w-page mx-auto">
      <Section title="UI Config" className="">
        <div className="flex">
          <p>Controls</p>
          <div className="flex mis-auto gap-3">
            <Button
              size="sm"
              variant='ghost'
              onClick={() => {
                setDisabled(!disabled);
              }}
            >
              {disabled ? "Enable" : "Disable"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsLoading(!isLoading);
              }}
            >
              {isLoading ? "Stop Loading" : "Set Loading"}
            </Button>
         <select name="" id="" className='bg-base1 c-base12'
          value={variant} onChange={(e) => setVariant(e.target.value as ButtonProps["variant"])}
         >
          <option value="ghost">ghost</option>
          <option value="ghost-accent">ghost accnet</option>
          <option value="outline">outline</option>
          <option value="outline-accent">outline accnet</option>
          <option value="text">text</option>
          <option value="text">text accent</option>
          <option value='solid'>Solid</option>
          <option value='solid'>Solid accent</option>
          <option value='soft'>Soft</option>
          <option value='soft-accent'>Soft accent</option>
         </select>
          </div>
          
        </div>
        <Buttons {...{isLoading, variant , disabled}} className=''/>
        <Buttons {...{isLoading, variant , disabled}}  className='flex flex-col max-w-40rem'/>

        <div className="h-12"></div>
        <div className="flex flex-wrap gap-3 ">
          <Input
            // label={<span>jdfldf</span>}
            value={value}
            setValue={setValue}
            prefixx={<span>hii</span>}
            suffix={<span>hii</span>}
            outerPrefix={<span>hii</span>}
            outerSuffix={<span>hii</span>}
          />

          <RadixToggleGroup.Root value={value} onValueChange={setValue} type="single">
            <RadixToggleGroup.Item value="light" asChild>
              <Button variant="ghost">Light</Button>
            </RadixToggleGroup.Item>
            <RadixToggleGroup.Item value="dark" asChild>
              <Button variant="ghost" className="">
                Dark
              </Button>
            </RadixToggleGroup.Item>
          </RadixToggleGroup.Root>

          <ToggleGroup<Settings["theme"]> value={theme} setValue={setTheme}>
            <ToggleGroup.Item value="light">
              <Icon name="bf-i-ph-sun" />
              <span className="sr-only">Light Color Scheme</span>
            </ToggleGroup.Item>
            <ToggleGroup.Item value="dark">
              <Icon name="bf-i-ph-moon" />
              <span className="sr-only">Dark Color Scheme</span>
            </ToggleGroup.Item>
            <ToggleGroup.Item value="system">
              <Icon name="bf-i-ph-device-mobile" className="sm:hidden" />
              <Icon name="bf-i-ph-laptop" className="lt-sm:hidden" />
              <span className="sr-only">Follow System Color Scheme</span>
            </ToggleGroup.Item>
          </ToggleGroup>

          <LinkButton href="/" variant="ghost">
            Link Button
          </LinkButton>
        </div>
        <Icon name="bf-i-ph-sun" className="???" />
        <TextArea label="dfdsflhd" name="dfdsf">
          d;fjdsf dkjfls dfl kdfl ksdf
        </TextArea>
        <Avatar src="" name="" size="2em" />
        <div className="flex gap-3"></div>

        <p>snippets</p>
        <p>select</p>
        <p>checkbox</p>
        <p>switch</p>
        <p>radio</p>
        <p>sanck</p>
        <p>kbd</p>
        <p>DropdownMenu</p>

        <div className="flex justify-center items-center b-1 b-base7 h-56px w-56px rd-20px">
          <div className="flex justify-center items-center b-1 b-base7 h-48px w-48px rd-16px">
            <div className="flex justify-center items-center b-1 b-base7 h-40px w-40px rd-12px">
              <div className="flex justify-center items-center b-1 b-base7 h-32px w-32px rd-8px">
                <div className="flex justify-center items-center b-1 b-base7 h-24px w-24px rd-4px"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-12"></div>
        <div className="flex">
          <div className="flex justify-center items-center b-1 b-base7 h-60px w-60px rd-16px">XL</div>
          <div className="flex justify-center items-center b-1 b-base7 h-52px w-52px rd-12px">LG</div>
          <div className="flex justify-center items-center b-1 b-base7 h-44px w-44px rd-8px">MD</div>
          <div className="flex justify-center items-center b-1 b-base7 h-36px w-36px rd-4px">SM</div>
          <div className="flex justify-center items-center b-1 b-base7 h-28px w-28px rd-0px">XS</div>
          <div className="flex justify-center items-center b-1 b-base7 h-60px w-60px rd-16px">
            <div className="flex justify-center items-center b-1 b-base7 h-44px w-44px rd-8px">MD</div>
          </div>
          <div className="flex justify-center items-center b-1 b-base7 h-44px w-44px rd-8px">
            <div className="flex justify-center items-center b-1 b-base7 h-28px w-28px rd-4px">XS</div>
          </div>
          <div className="flex justify-center items-center b-1 b-base7 h-44px px-4px flex gap-4px rd-8px">
            <div className="flex justify-center items-center b-1 b-base7 h-36px w-36px rd-4px">SM</div>
            <div className="flex justify-center items-center b-1 b-base7 h-36px w-36px rd-4px">SM</div>
            <div className="flex justify-center items-center b-1 b-base7 h-36px w-36px rd-4px">SM</div>
          </div>
        </div>
        <div className="h-12"></div>

        <div className="flex flex-wrap">
          <div className="flex justify-center items-center b-1 b-base7 h-68px w-68px rd-22px">XL</div>
          <div className="flex justify-center items-center b-1 b-base7 h-60px w-60px rd-16px">LG</div>
          <div className="flex justify-center items-center b-1 b-base7 h-44px w-44px rd-8px">MD</div>
          <div className="flex justify-center items-center b-1 b-base7 h-32px w-32px rd-4px">SM</div>
          <div className="flex justify-center items-center b-1 b-base7 h-20px w-20px rd-0px">XS</div>
          <div className="flex justify-center items-center b-1 b-base7 h-62px px-9px flex gap-9 px  rd-18px">
            THis is a note
            <div className="flex justify-center items-center b-1 b-base7 h-44px w-44px rd-10px">MD</div>
            <div className="flex justify-center items-center b-1 b-base7 h-44px w-44px rd-10px">MD</div>
            <div className="flex justify-center items-center b-1 b-base7 h-44px w-44px rd-10px">MD</div>
          </div>
          <div className="flex justify-center items-center b-1 b-base7 h-56px w-56px rd-16px">
            <div className="flex justify-center items-center b-1 b-base7 h-44px w-44px rd-10px">MD</div>
          </div>
          <div className="flex justify-center items-center b-1 b-base7 h-60px px-7px rd-12px flex gap-7px">
            This is a note
            <div className="flex justify-center items-center b-1 b-base7 h-44px w-44px rd-8px">Accept</div>
            <div className="flex justify-center items-center b-1 b-base7 h-44px w-44px rd-8px">MD</div>
            <div className="flex justify-center items-center b-1 b-base7 h-44px w-44px rd-8px">MD</div>
          </div>

          <div className="flex justify-center items-center b-1 b-base7 h-44px w-44px rd-10px">
            <div className="flex justify-center items-center b-1 b-base7 h-28px w-28px rd-4px">XS</div>
          </div>
          <div className="flex justify-center items-center b-1 b-base7 h-44px px-4px flex gap-4px rd-8px">
            <div className="flex justify-center items-center b-1 b-base7 h-32px w-32px rd-4px">SM</div>
            <div className="flex justify-center items-center b-1 b-base7 h-32px w-32px rd-4px">SM</div>
            <div className="flex justify-center items-center b-1 b-base7 h-32px w-32px rd-4px">SM</div>
          </div>
        </div>
        <div className="h-12"></div>
      </Section>
    </div>
  );
}

function Buttons({ disabled, isLoading, className , variant }: { disabled: boolean; isLoading: boolean; className: string, variant: ButtonProps['variant'] }) {
  return (
    <div className={className}>
      <Button  {...{ disabled, isLoading ,variant }}>
        Button
      </Button>
      <br />
      <Button  before={<Icon name="bf-i-ph-sun" className="c-base11 " />} {...{ disabled, isLoading ,variant }}>
        Before
      </Button>
      <br />
      <Button  suffix={<Icon name="bf-i-ph-sun" className="c-base11 " />} {...{ disabled, isLoading ,variant }}>
        Ssuffix
      </Button>
      <br />
      <Button
        
        before={<Icon name="bf-i-ph-moon" className="c-base11 " />}
        suffix={<Icon name="bf-i-ph-sun" className="c-base11 " />}
        {...{ disabled, isLoading ,variant }}
      >
        Suffix + before
      </Button>
      {/* <br /> */}
      <Button  className="" {...{ disabled, isLoading ,variant }}>
        <Icon name="bf-i-ph-sun" className="c-base11 " />
        <span className="inline-flex items-center">
        <Icon name="bf-i-ph-sun" className="c-base11 " />
        <span className='???'>
        Icon inside
        </span>
        </span>
      </Button>
      <br />
      <Button  className="" {...{ disabled, isLoading ,variant }}>
        Icon inside
        <Icon name="bf-i-ph-sun" className="c-base11 " />
      </Button>
      <br />
      <Button
        
        before={<Icon name="bf-i-ph-moon" className="c-base11 " />}
        suffix={<Icon name="bf-i-ph-sun" className="c-base11 " />}
        {...{ disabled, isLoading ,variant }}
      >
        suffix + before
      </Button>
    </div>
  );
}

function Section({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  const headerId = useId();
  return (
    <section className={className} aria-labelledby={headerId}>
      <h1 className="H1" id={headerId}>
        {title}
      </h1>
      <Space size="h-8" />
      {children}

      <Space size="h-8" />
      <div className="b-t-2 b-base5"></div>
    </section>
  );
}
