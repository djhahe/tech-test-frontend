import React from 'react';

interface SectionPanelProps {
  className?: string;
}

export const SectionPanel: React.FC<SectionPanelProps> = (props) => (
  <div className={props.className}>{props.children}</div>
);
