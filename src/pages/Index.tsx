import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const [birthDate, setBirthDate] = useState({
    year: "",
    month: "",
    day: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Generate arrays for dropdown options
  const years = Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => 
    (1900 + i).toString()
  ).reverse();
  
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: new Date(2000, i).toLocaleString('default', { month: 'long' })
  }));
  
  const getDaysInMonth = (month: string, year: string) => {
    if (!month || !year) return Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
  };

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
      navigate('/results', { state: { generation: result } });
    } else {
      toast({
        title: "Not Gen Z or Alpha",
        description: "Based on your birth year, you're not part of Generation Z or Alpha.",
        variant: "destructive",
      });
    }
  };

  const handleDateChange = (field: 'year' | 'month' | 'day', value: string) => {
    setBirthDate(prev => {
      const newDate = { ...prev, [field]: value };
      // Reset day if it's greater than the days in the selected month
      if (field === 'month' || field === 'year') {
        const daysInMonth = getDaysInMonth(newDate.month, newDate.year).length;
        if (parseInt(newDate.day) > daysInMonth) {
          newDate.day = "";
        }
      }
      return newDate;
    });
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
                <Select
                  value={birthDate.month}
                  onValueChange={(value) => handleDateChange('month', value)}
                >
                  <SelectTrigger id="month" className="text-lg py-6">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(month => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="day">Day</Label>
                <Select
                  value={birthDate.day}
                  onValueChange={(value) => handleDateChange('day', value)}
                >
                  <SelectTrigger id="day" className="text-lg py-6">
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {getDaysInMonth(birthDate.month, birthDate.year).map(day => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select
                  value={birthDate.year}
                  onValueChange={(value) => handleDateChange('year', value)}
                >
                  <SelectTrigger id="year" className="text-lg py-6">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(year => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
      </motion.div>
    </div>
  );
};

export default Index;
