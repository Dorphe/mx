interface UserMessageProps {
  text: string;
}

export function UserMessage({ text }: UserMessageProps) {
  return (
    <div className="flex justify-end px-4 animate-[fade-in-up_0.3s_ease]">
      <div className="max-w-80 py-3 px-4 bg-bg-secondary rounded-xl text-sm leading-5 text-text-primary">
        {text}
      </div>
    </div>
  );
}
