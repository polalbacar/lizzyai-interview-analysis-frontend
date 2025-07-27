import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Brain, ArrowLeft, Download, Share2, Shield, AlertTriangle, CheckCircle, XCircle, ChevronDown } from "lucide-react";

interface FraudIndicator {
  type: string;
  detected: boolean;
  confidence: number;
  description: string;
}

interface Question {
  question: string;
  answer: string;
  score: number;
  feedback: string;
  fraudScore: number;
  fraudIndicators: FraudIndicator[];
}

interface ResultData {
  candidateName: string;
  role: string;
  fileName: string;
  processedAt: string;
}

const Results = () => {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [finalScore] = useState(78); // Mock final score
  const [overallFraudScore] = useState(15); // Mock fraud score (0-100, lower is better)

  // Mock questions and answers with fraud detection
  const [questions] = useState<Question[]>([
    {
      question: "Tell me about your experience with React and modern JavaScript frameworks.",
      answer: "I have been working with React for about 3 years now. I've built several production applications using React with TypeScript, and I'm familiar with hooks, context API, and state management libraries like Redux. I also have experience with Next.js for server-side rendering.",
      score: 85,
      feedback: "Strong technical knowledge demonstrated. Good understanding of modern React patterns.",
      fraudScore: 10,
      fraudIndicators: [
        { type: "Text-to-Speech", detected: false, confidence: 95, description: "Natural speech patterns detected" },
        { type: "Reading Script", detected: false, confidence: 90, description: "Spontaneous response with natural pauses" },
        { type: "External Help", detected: false, confidence: 85, description: "No suspicious background activity" }
      ]
    },
    {
      question: "Describe a challenging problem you solved in your previous role.",
      answer: "In my last project, we had a performance issue where our application was loading slowly. I identified that we were making too many API calls and implemented a caching strategy using React Query. This reduced load times by 40%.",
      score: 82,
      feedback: "Excellent problem-solving approach. Shows initiative and technical depth.",
      fraudScore: 25,
      fraudIndicators: [
        { type: "Text-to-Speech", detected: false, confidence: 88, description: "Natural intonation detected" },
        { type: "Reading Script", detected: true, confidence: 70, description: "Some sections may have been rehearsed" },
        { type: "External Help", detected: false, confidence: 92, description: "No external assistance detected" }
      ]
    },
    {
      question: "How do you handle working in a team environment?",
      answer: "I believe communication is key. I always make sure to participate actively in stand-ups and code reviews. I'm comfortable giving and receiving feedback, and I try to mentor junior developers when possible.",
      score: 75,
      feedback: "Good team collaboration skills. Could provide more specific examples.",
      fraudScore: 5,
      fraudIndicators: [
        { type: "Text-to-Speech", detected: false, confidence: 98, description: "Authentic voice patterns" },
        { type: "Reading Script", detected: false, confidence: 95, description: "Natural conversational flow" },
        { type: "External Help", detected: false, confidence: 90, description: "No signs of coaching" }
      ]
    },
    {
      question: "Where do you see yourself in 5 years?",
      answer: "I want to continue growing as a developer and eventually move into a technical leadership role. I'm interested in architecture decisions and helping shape the technical direction of products.",
      score: 70,
      feedback: "Clear career aspirations. Shows ambition and forward thinking.",
      fraudScore: 20,
      fraudIndicators: [
        { type: "Text-to-Speech", detected: false, confidence: 85, description: "Minor robotic qualities detected" },
        { type: "Reading Script", detected: true, confidence: 75, description: "Response appears prepared" },
        { type: "Long Silences", detected: true, confidence: 65, description: "Unusual pauses before answering" }
      ]
    }
  ]);

  useEffect(() => {
    const stored = localStorage.getItem('lizzy-result');
    if (stored) {
      setResultData(JSON.parse(stored));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!resultData) {
    return <div>Loading...</div>;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "success";
    if (score >= 60) return "warning";
    return "destructive";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  const getFraudColor = (score: number) => {
    if (score <= 20) return "success";
    if (score <= 50) return "warning";
    return "destructive";
  };

  const getFraudStatus = (score: number) => {
    if (score <= 20) return "Low Risk";
    if (score <= 50) return "Medium Risk";
    return "High Risk";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">LizzyAI</h1>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              New Analysis
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header Info */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Interview Analysis Results</h1>
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <span><strong>Candidate:</strong> {resultData.candidateName}</span>
            <span><strong>Role:</strong> {resultData.role}</span>
            <span><strong>Processed:</strong> {new Date(resultData.processedAt).toLocaleString()}</span>
          </div>
        </div>

        {/* Main Fraud Detection Card */}
        <Card className={`mb-8 ${overallFraudScore <= 20 ? 'bg-gradient-to-r from-success/10 to-success/5 border-success/20' : overallFraudScore <= 50 ? 'bg-gradient-to-r from-warning/10 to-warning/5 border-warning/20' : 'bg-gradient-to-r from-destructive/10 to-destructive/5 border-destructive/20'}`}>
          <CardContent className="pt-8">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full mb-4 ${overallFraudScore <= 20 ? 'bg-success/10 border-4 border-success/20' : overallFraudScore <= 50 ? 'bg-warning/10 border-4 border-warning/20' : 'bg-destructive/10 border-4 border-destructive/20'}`}>
                <span className={`text-4xl font-bold ${overallFraudScore <= 20 ? 'text-success' : overallFraudScore <= 50 ? 'text-warning' : 'text-destructive'}`}>{overallFraudScore}</span>
              </div>
              <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                <Shield className="h-6 w-6" />
                Overall Fraud Risk Score
              </h2>
              <Badge variant={getFraudColor(overallFraudScore) as any} className="text-sm px-4 py-1">
                {getFraudStatus(overallFraudScore)}
              </Badge>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                {overallFraudScore <= 20 
                  ? "Interview shows minimal signs of fraudulent behavior. Natural responses and authentic voice patterns detected throughout."
                  : overallFraudScore <= 50 
                  ? "Some potential fraud indicators detected. Review individual question analysis for specific concerns that need attention."
                  : "Multiple fraud indicators detected across questions. Manual review and verification strongly recommended before proceeding."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share Results
          </Button>
        </div>

        {/* Questions and Answers */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Question-by-Question Analysis</h3>
          {questions.map((q, index) => (
            <Collapsible key={index}>
              <Card className="shadow-sm">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="pb-4 hover:bg-muted/30 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-muted-foreground">Q{index + 1}</span>
                        <CardTitle className="text-left text-lg leading-relaxed">
                          {q.question}
                        </CardTitle>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-1 ${q.fraudScore <= 20 ? 'bg-success text-success-foreground' : q.fraudScore <= 50 ? 'bg-warning text-warning-foreground' : 'bg-destructive text-destructive-foreground'}`}>
                            {q.fraudScore}
                          </div>
                          <Badge 
                            variant={getFraudColor(q.fraudScore) as any} 
                            className="text-xs px-2 py-0.5 font-medium"
                          >
                            {getFraudStatus(q.fraudScore)}
                          </Badge>
                        </div>
                        <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Candidate Response:</h4>
                      <p className="text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
                        "{q.answer}"
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">AI Feedback:</h4>
                      <p className="text-muted-foreground">{q.feedback}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Fraud Analysis:
                      </h4>
                      <div className="space-y-2">
                        {q.fraudIndicators.map((indicator, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                            <div className="flex items-center gap-2">
                              {indicator.detected ? (
                                <XCircle className="h-4 w-4 text-destructive" />
                              ) : (
                                <CheckCircle className="h-4 w-4 text-success" />
                              )}
                              <span className="font-medium text-sm">{indicator.type}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">{indicator.description}</div>
                              <div className="text-xs font-medium">
                                Confidence: {indicator.confidence}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>

        {/* Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Summary & Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-success mb-2">Strengths:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Strong technical knowledge in React and modern JavaScript</li>
                  <li>Good problem-solving abilities with concrete examples</li>
                  <li>Clear communication and structured responses</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-warning mb-2">Areas for Improvement:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Could provide more specific examples of team collaboration</li>
                  <li>Leadership experience could be better articulated</li>
                  <li>Career goals could be more detailed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">Recommendation:</h4>
                <p className="text-muted-foreground">
                  <strong>Proceed to next round.</strong> Candidate shows strong technical competency 
                  and good communication skills. Consider follow-up questions about leadership 
                  experience and specific project examples.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;