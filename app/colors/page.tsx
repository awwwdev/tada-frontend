import Space from "@/components/ui/Space";
import { useId } from "react";
import GradientMask, { gradientMask } from "@/components/ui/GradientMask";
import BluredCircle from "@/components/home-page-sections/BluredCircle";
import GlassCard from "@/components/ui/GlassCard";
import Color from "colorjs.io";
import * as radixColors from "@radix-ui/colors";

// border color or gradient
// noise
// bg-gradient or color
//  shadow or glow

export default function Page() {
  return (
    <div className="max-w-page mx-auto">
      <Section title="LCH Colors" className="space-y-6 lch">
        <div className="flex gap-2">
          {Object.values(radixColors.amber).map((i) => {
            const color = new Color(i);
            return (
              <div className="w-25  fs-sm">
                <div className='h-8' style={{ backgroundColor: color.toString() }} ></div>
                <div>{i}</div>
                <div>{Number(color.oklch.l).toFixed(2)}</div>
                <div>{Number(color.oklch.c).toFixed(2)}</div>
                <div>{Number(color.oklch.h).toFixed(2)}</div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          {Object.values(radixColors.orange).map((i) => {
            const color = new Color(i);
            return (
              <div className="w-25  fs-sm">
                <div className='h-8' style={{ backgroundColor: color.toString() }} ></div>
                <div>{i}</div>
                <div>{Number(color.oklch.l).toFixed(2)}</div>
                <div>{Number(color.oklch.c).toFixed(2)}</div>
                <div>{Number(color.oklch.h).toFixed(2)}</div>
              </div>
            );
          })}
        </div>

        <GrayPalette title="LCH Gray Palette" className="gray-cool" />
        <GrayPalette title="LCH Gray Palette" className="gray-warm" />
        <GrayPalette title="LCH Gray Palette" className="gray-hueless" />
        <ColorPalette title="LCH Color Palette grayscaled" className="grayscale-100" />
        <ColorPalette title="LCH Color Palette" />
      </Section>

      <Section title="OKLCH Colors" className="space-y-6">
        <GrayPalette title="OKLCH Gray Palette" className="gray-cool" />
        <GrayPalette title="OKLCH Gray Palette" className="gray-warm" />
        <GrayPalette title="OKLCH Gray Palette" className="gray-hueless" />
        <ColorPalette title="OKLCG Color Palette grayscaled" className="grayscale-100" />
        <ColorPalette title="OKLCG Color Palette" />
      </Section>
    </div>
  );
}

function Section({ title, className = "", children }) {
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

function ColorPalette({ title = "", className = "" }) {
  return (
    <div className={className}>
      <h3 className="fs-sm">{title}</h3>
      <div>
        <ColorSwatch style={{ "--color-hue": "var(--hue-red)" }} />
        <ColorSwatch style={{ "--color-hue": "var(--hue-pink)" }} />
        <ColorSwatch style={{ "--color-hue": "var(--hue-purple)" }} />
        <ColorSwatch style={{ "--color-hue": "var(--hue-violet)" }} />
        <ColorSwatch style={{ "--color-hue": "var(--hue-indigo)" }} />
        <ColorSwatch style={{ "--color-hue": "var(--hue-blue)" }} />
        <ColorSwatch style={{ "--color-hue": "var(--hue-cyan)" }} />
        <ColorSwatch style={{ "--color-hue": "var(--hue-teal)" }} />
        <ColorSwatch style={{ "--color-hue": "var(--hue-green)" }} />
        <ColorSwatch style={{ "--color-hue": "var(--hue-lime)" }} />
        <ColorSwatch style={{ "--color-hue": "var(--hue-yellow)" }} />
        <ColorSwatch style={{ "--color-hue": "var(--hue-orange)" }} />
      </div>
    </div>
  );
}

function GrayPalette({ className, title }) {
  return (
    <div className={className}>
      <h3 className="fs-sm">{title}</h3>
      <div>
        <GraySwatch />
      </div>
    </div>
  );
}

function ColorSwatch({ className = "", style = {} }) {
  return (
    <div className={`flex gap-1 ${className}`} style={style}>
      {Array.from({ length: 15 }).map((_, i) => {
        return <ColorCell style={{ backgroundColor: `var(--color-${i})`, color: i < 6 ? "black" : "white" }} />;
      })}
    </div>
  );
}

function GraySwatch({ className = "", style }) {
  return (
    <div className={`flex gap-1 ${className}`} style={style}>
      {Array.from({ length: 15 }).map((_, i) => {
        return <ColorCell style={{ backgroundColor: `var(--gray-${i})`, color: i < 6 ? "black" : "white" }} />;
      })}
    </div>
  );
}

function ColorCell({ className = "", style = {}, title = "", colorValue = "" }) {
  return (
    <div className={`${className} b-1 b-base5 rd-1 w-15 h-8 p-1`} style={style}>
      {title} hi
      <span className="fs-sm">{colorValue}</span>
    </div>
  );
}
