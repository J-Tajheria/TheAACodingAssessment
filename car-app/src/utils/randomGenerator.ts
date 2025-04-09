export function getRandomHealthStatus(): 'Good' | 'Fair' | 'Poor' {
    const statuses = ['Good', 'Fair', 'Poor'] as const;
    return statuses[Math.floor(Math.random() * statuses.length)];
}

export function getRandomFaultCount(): number {
    return Math.floor(Math.random() * 5); // 0–4 faults
}
