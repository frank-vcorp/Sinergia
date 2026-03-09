import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { cn } from "@/lib/utils";

export type ProcessStatus =
    | 'en_recepcion'
    | 'asignado'
    | 'entrevistado'
    | 'no_entrevistado'
    | 'en_verificacion'
    | 'visita_programada'
    | 'visita_realizada'
    | 'en_dictamen'
    | 'finalizado'
    | 'entregado';

interface Step {
    id: ProcessStatus;
    label: string;
}

const STEPS: Step[] = [
    { id: 'en_recepcion', label: 'RECEPCIÓN' },
    { id: 'asignado', label: 'ASIGNADO' },
    { id: 'entrevistado', label: 'ENTREVISTADO' },
    { id: 'en_verificacion', label: 'INVESTIGACIÓN' },
    { id: 'en_dictamen', label: 'REVISIÓN FINAL' },
    { id: 'finalizado', label: 'FINALIZADO' },
];

interface ProcessTimelineProps {
    currentStatus: string;
    className?: string;
}

export function ProcessTimeline({ currentStatus, className }: ProcessTimelineProps) {
    const currentIndex = STEPS.findIndex(s => s.id === currentStatus);

    // Handle edge cases for statuses not in the main line (like no_entrevistado or visits)
    let effectiveIndex = currentIndex;
    if (currentStatus === 'no_entrevistado') effectiveIndex = 2; // Treat as Entrevistado level but with warning
    if (currentStatus === 'visita_programada' || currentStatus === 'visita_realizada') effectiveIndex = 3; // Investigation level
    if (currentStatus === 'entregado') effectiveIndex = 5; // Finalizado level

    return (
        <div className={cn("w-full py-4 px-2", className)}>
            <div className="relative flex justify-between items-start">
                {/* Connecting Line */}
                <div className="absolute top-5 left-0 w-full h-0.5 bg-muted -z-10" />
                <div
                    className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500 -z-10"
                    style={{ width: `${(Math.max(0, effectiveIndex) / (STEPS.length - 1)) * 100}%` }}
                />

                {STEPS.map((step, index) => {
                    const isCompleted = index < effectiveIndex || (index === effectiveIndex && currentStatus === STEPS[index].id && ['finalizado', 'entregado'].includes(currentStatus));
                    const isCurrent = index === effectiveIndex;
                    const isPending = index > effectiveIndex;

                    return (
                        <div key={step.id} className="flex flex-col items-center flex-1">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                    isCompleted ? "bg-primary border-primary text-white" :
                                        isCurrent ? "bg-background border-primary text-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" :
                                            "bg-muted border-muted text-muted-foreground"
                                )}
                            >
                                {isCompleted ? (
                                    <Check className="w-5 h-5" />
                                ) : isCurrent ? (
                                    currentStatus === 'no_entrevistado' ? <AlertCircle className="w-5 h-5 text-destructive" /> : <Clock className="w-5 h-5 animate-pulse" />
                                ) : (
                                    <span className="text-xs font-bold">{index + 1}</span>
                                )}
                            </div>
                            <span
                                className={cn(
                                    "mt-2 text-[10px] font-bold text-center uppercase tracking-tighter sm:tracking-normal sm:text-xs px-1",
                                    isCurrent ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
