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

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Hero Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              AI-Powered Interview
              <span className="text-primary block">Analysis</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Upload interview recordings and get instant AI-driven candidate evaluation with detailed insights and scoring.
            </p>
            
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Mic className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Speech Analysis</h3>
                  <p className="text-sm text-muted-foreground">Advanced speech-to-text and conversation analysis</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Scoring</h3>
                  <p className="text-sm text-muted-foreground">Intelligent evaluation with detailed question breakdown</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Candidate Insights</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive candidate assessment and recommendations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Upload Form */}
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Upload Interview Recording</CardTitle>
                <CardDescription>
                  Upload an audio file along with candidate details to begin AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
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
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
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
                            <span className="text-sm">{file.name}</span>
                          </div>
                        ) : (
                          <div>
                            <UploadIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground mb-1 text-sm">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
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
      </div>
    </div>
  );
};

export default Upload;