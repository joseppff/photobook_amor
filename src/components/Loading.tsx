interface LoadingProps {
  message?: string;
}

const Loading = ({ message = "Cargando contenido" }: LoadingProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="font-body text-muted-foreground">{message}...</p>
      </div>
    </div>
  );
};

export default Loading;
