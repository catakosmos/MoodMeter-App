import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

const MoodStep = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string>("");

  const moods = [
    { emoji: "😊", label: "Feliz", value: "happy", color: "mood-happy" },
    { emoji: "😌", label: "Tranquilo", value: "calm", color: "mood-calm" },
    { emoji: "😢", label: "Triste", value: "sad", color: "mood-sad" },
    { emoji: "😠", label: "Enojado", value: "angry", color: "mood-angry" },
    { emoji: "😰", label: "Ansioso", value: "anxious", color: "mood-anxious" }
  ];

  const handleMoodSelect = (moodValue: string) => {
    setSelectedMood(moodValue);
  };

  const handleContinue = () => {
    if (selectedMood) {
      // Store the mood selection
      localStorage.setItem('checkinMood', selectedMood);
      navigate('/checkin/sleep');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted">
      <div className="max-w-md mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-12">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-accent rounded-3xl flex items-center justify-center shadow-mood">
            <span className="text-2xl">🎭</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Check-in Diario
            </h1>
            <p className="text-muted-foreground">
              Paso 1 de 3
            </p>
          </div>
        </div>

        {/* Question */}
        <div className="text-center space-y-8">
          <h2 className="text-xl font-semibold text-foreground">
            ¿Cómo describirías tu estado de ánimo?
          </h2>
          
          {/* Emotion Roulette */}
          <div className="relative w-80 h-80 mx-auto">
            {/* Center circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border-2 border-primary/30 flex items-center justify-center shadow-lg">
                <span className="text-sm font-medium text-foreground">
                  Selecciona
                </span>
              </div>
            </div>
            
            {/* Emotion circles arranged in a circle */}
            {moods.map((mood, index) => {
              const angle = (index * 360) / moods.length - 90; // Start from top
              const radius = 120; // Distance from center
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              
              return (
                <button
                  key={mood.value}
                  onClick={() => handleMoodSelect(mood.value)}
                  className={`
                    absolute top-1/2 left-1/2 w-20 h-20 rounded-full
                    flex flex-col items-center justify-center gap-1
                    transition-all duration-300 hover:scale-110
                    ${selectedMood === mood.value 
                      ? 'bg-primary/30 ring-4 ring-primary shadow-lg scale-110' 
                      : 'bg-card hover:bg-card/80'
                    }
                    border-2 border-border
                  `}
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <span className="text-3xl">{mood.emoji}</span>
                  <span className="text-xs font-medium text-foreground">
                    {mood.label}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* Selected mood indicator */}
          {selectedMood && (
            <div className="animate-fade-in">
              <p className="text-sm text-muted-foreground">
                Estado seleccionado: <span className="font-semibold text-foreground">
                  {moods.find(m => m.value === selectedMood)?.label}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="pt-8">
          <Button
            onClick={handleContinue}
            disabled={!selectedMood}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent/90 shadow-soft disabled:opacity-50"
            size="lg"
          >
            Continuar
            <ChevronRight className="ml-2" size={20} />
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="flex space-x-2 justify-center">
          <div className="w-8 h-2 bg-primary rounded-full"></div>
          <div className="w-8 h-2 bg-muted rounded-full"></div>
          <div className="w-8 h-2 bg-muted rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default MoodStep;