import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Upload as UploadIcon, Mic, CheckCircle, Users, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [candidateName, setCandidateName] = useState("");
  const [role, setRole] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !candidateName || !role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and upload an audio file.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Mock processing time
    setTimeout(() => {
      // Store data in localStorage for demo
      localStorage.setItem('lizzy-result', JSON.stringify({
        candidateName,
        role,
        fileName: file.name,
        processedAt: new Date().toISOString()
      }));
      
      navigate('/results');
    }, 3000);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Processing Interview</h3>
            <p className="text-muted-foreground">AI is analyzing the conversation...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">LizzyAI</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            AI-Powered Interview
            <span className="text-primary block">Analysis</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload interview recordings and get instant AI-driven candidate evaluation with detailed insights and scoring.
          </p>
          
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <Mic className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Speech Analysis</h3>
              <p className="text-sm text-muted-foreground">Advanced speech-to-text and conversation analysis</p>
            </div>
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <BarChart3 className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">AI Scoring</h3>
              <p className="text-sm text-muted-foreground">Intelligent evaluation with detailed question breakdown</p>
            </div>
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Candidate Insights</h3>
              <p className="text-sm text-muted-foreground">Comprehensive candidate assessment and recommendations</p>
            </div>
          </div>
        </div>

        {/* Upload Form */}
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Upload Interview Recording</CardTitle>
            <CardDescription>
              Upload an audio file along with candidate details to begin AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="candidateName">Candidate Name</Label>
                  <Input
                    id="candidateName"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="Enter candidate name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Software Engineer"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="audioFile">Interview Recording</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    id="audioFile"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="audioFile" className="cursor-pointer">
                    {file ? (
                      <div className="flex items-center justify-center space-x-2 text-primary">
                        <CheckCircle className="h-5 w-5" />
                        <span>{file.name}</span>
                      </div>
                    ) : (
                      <div>
                        <UploadIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Supports MP3, WAV, M4A files
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Brain className="mr-2 h-4 w-4" />
                Analyze Interview
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upload;