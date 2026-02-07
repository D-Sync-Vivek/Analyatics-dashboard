import { LucideIcon } from "lucide-react";

export interface MetricCardData {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
}

export interface Transaction{
    id: string;
    customer_name: string,
    customer_email: string,
    amount: number;
    status: 'pending' | 'success' | 'failed' | 'processing';
    created_at: string;
}

export interface DashboardCardProps{
    title: string;
    value: string;
    icon: LucideIcon;
    trend: {
        value: number;
        direction: "up" | "down";
    }
}