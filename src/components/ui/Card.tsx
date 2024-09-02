// src/components/ui/card.tsx
import React, { ReactNode } from "react";

interface Card {
  children: ReactNode;
  className?: string;
}

interface CardHeader {
  children: ReactNode;
  className?: string;
}

interface CardContent {
  children: ReactNode;
  className?: string;
}

interface CardFooter {
  children: ReactNode;
  className?: string;
}

interface CardTitle {
  children: ReactNode;
  className?: string;
}

interface CardDescription {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<Card> = ({ children, className = "" }) => (
  <div className={`rounded-3xl ${className}`}>
    {children}
  </div>
);

export const CardHeader: React.FC<CardHeader> = ({
  children,
  className = "",
}) => (
  <div className={`pt-4 ${className}`}>{children}</div>
);

export const CardContent: React.FC<CardContent> = ({
  children,
  className = "",
}) => <div className={`p-4 ${className}`}>{children}</div>;

export const CardFooter: React.FC<CardFooter> = ({
  children,
  className = "",
}) => (
  <div className={`pl-4 pr-4 ${className}`}>{children}</div>
);

export const CardTitle: React.FC<CardTitle> = ({
  children,
  className = "",
}) => <h3 className={`text-md font-medium ${className}`}>{children}</h3>;

export const CardDescription: React.FC<CardDescription> = ({
  children,
  className = "",
}) => <p className={`text-sm text-gray-600 ${className}`}>{children}</p>;
