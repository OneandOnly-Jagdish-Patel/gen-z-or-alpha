
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [birthDate, setBirthDate] = useState({
    year: "",
    month: "",
    day: ""
  });
  const [generation, setGeneration] = useState<string | null>(null);
  const { toast } = useToast();

  const determineGeneration = (year: number) => {
    if (year >= 1997 && year <= 2012) {
      return "Gen Z";
    } else if (year >= 2013) {
      return "Gen Alpha";
    } else {
      return null;
    }
  };

  const validateDate = (year: number, month: number, day: number) => {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && 
           date.getMonth() === month - 1 && 
           date.getDate() === day;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const year = parseInt(birthDate.year);
    const month = parseInt(birthDate.month);
    const day = parseInt(birthDate.day);
    
    if (!birthDate.year || !birthDate.month || !birthDate.day || 
        isNaN(year) || isNaN(month) || isNaN(day) || 
        year < 1900 || year > new Date().getFullYear() ||
        month < 1 || month > 12 || day < 1 || day > 31 ||
        !validateDate(year, month, day)) {
      toast({
        title: "Invalid Date",
        description: "Please enter a valid birth date.",
        variant: "destructive",
      });
      return;
    }

    const result = determineGeneration(year);
    if (result) {
      setGeneration(result);
    } else {
      toast({
        title: "Not Gen Z or Alpha",
        description: "Based on your birth year, you're not part of Generation Z or Alpha.",
        variant: "destructive",
      });
    }
  };

  const handleDateChange = (field: 'year' | 'month' | 'day', value: string) => {
    setBirthDate(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            Generation Identifier
          </Badge>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">
            Which Generation Are You?
          </h1>
          <p className="text-gray-600">
            Enter your birth date to discover if you're Gen Z or Gen Alpha
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="glass-card p-6 rounded-xl space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="month">Month</Label>
                <Input
                  id="month"
                  type="number"
                  placeholder="MM"
                  value={birthDate.month}
                  onChange={(e) => handleDateChange('month', e.target.value)}
                  min="1"
                  max="12"
                  className="text-lg py-6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="day">Day</Label>
                <Input
                  id="day"
                  type="number"
                  placeholder="DD"
                  value={birthDate.day}
                  onChange={(e) => handleDateChange('day', e.target.value)}
                  min="1"
                  max="31"
                  className="text-lg py-6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="YYYY"
                  value={birthDate.year}
                  onChange={(e) => handleDateChange('year', e.target.value)}
                  min="1900"
                  max={new Date().getFullYear()}
                  className="text-lg py-6"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full mt-4 py-6 text-lg font-medium transition-all duration-200 hover:scale-[1.02]"
            >
              Discover My Generation
            </Button>
          </div>
        </form>

        {generation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8 glass-card p-6 rounded-xl text-center"
          >
            <Badge
              variant="secondary"
              className="mb-4 text-lg px-4 py-1"
            >
              Result
            </Badge>
            <h2 className="text-3xl font-bold mb-4">You're {generation}!</h2>
            <p className="text-gray-600">
              {generation === "Gen Z"
                ? "Born between 1997 and 2012, you're part of the digital native generation known for your tech-savvy nature and global mindset."
                : "Born after 2012, you're part of the most technologically integrated generation, growing up with AI, smart devices, and immersive technology."}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Index;
