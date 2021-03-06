import React from "react";
import clsx from "clsx";
import { SectionBase } from "types";
import { CtaButton, Section, ConditionalLink } from "components";

export interface CtaSectionData extends SectionBase {
  type: "callToAction";
  ctaLink: string;
  cta: string;
  mdMain?: {
    html: string;
  };
  accent?: boolean;
}

export const CtaSection: React.FC<CtaSectionData> = ({
  accent,
  ctaLink,
  cta,
  mdMain,
}) => {
  return (
    <Section accentBase={accent}>
      <div
        className={clsx("cta-section", {
          "has-accent": accent,
        })}
      >
        {mdMain && (
          <div
            className="cta-details"
            dangerouslySetInnerHTML={{
              __html: mdMain.html,
            }}
          />
        )}
        <div className="cta-callout">
          <ConditionalLink to={ctaLink}>
            <CtaButton tabIndex={-1}>{cta}</CtaButton>
          </ConditionalLink>
        </div>
      </div>
    </Section>
  );
};
