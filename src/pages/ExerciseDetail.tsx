import { BottomNavigation } from "@/components/BottomNavigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "react-router-dom";

const prettify = (slug: string | undefined) => {
  if (!slug) return "Ejercicio";
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const ExerciseDetail = () => {
  const { slug } = useParams();
  const title = prettify(slug);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted pb-20">
      <div className="max-w-md mx-auto p-6 space-y-6">
        <div className="text-center pt-8 space-y-2">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">Detalle del ejercicio</p>
        </div>

        <Card className="p-6">
          <p className="text-muted-foreground">Aquí puedes añadir la explicación, pasos y recursos multimedia para el ejercicio <strong>{title}</strong>.</p>
        </Card>

        <Link to="/exercises" className="no-underline">
          <Button className="w-full">Volver a ejercicios</Button>
        </Link>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ExerciseDetail;
