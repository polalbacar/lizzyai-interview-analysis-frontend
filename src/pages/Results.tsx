import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Brain, ArrowLeft, Download, Share2, Shield, AlertTriangle, CheckCircle, XCircle, ChevronDown, MessageSquare, BarChart3 } from "lucide-react";

interface FraudInsights {
  reading_aloud: boolean;
  external_help: boolean;
  scripted_content: boolean;
  confidence_level: string;
  details: string;
}

interface ApiQuestion {
  question: string;
  answer: string;
  fraud_score: number;
  insights: FraudInsights;
}

interface ApiResponse {
  candidate: string;
  role: string;
  final_fraud_score: number;
  questions: ApiQuestion[];
}

interface ResultData {
  candidate?: string;
  candidateName?: string; // Legacy format
  role: string;
  final_fraud_score?: number;
  final_score?: number; // Legacy format
  fileName: string;
  processedAt: string;
  questions?: ApiQuestion[];
}

const Results = () => {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [finalFraudScore, setFinalFraudScore] = useState(0);
  const [questions, setQuestions] = useState<ApiQuestion[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('lizzy-result');
    if (stored) {
      const data = JSON.parse(stored);
      setResultData(data);
      
      // Set final fraud score from API data
      if (data.final_fraud_score !== undefined) {
        setFinalFraudScore(data.final_fraud_score);
      } else if (data.final_score !== undefined) {
        // Legacy fallback - convert quality score to fraud score (inverse)
        setFinalFraudScore(100 - data.final_score);
      }
      
      // Use questions directly from API data
      if (data.questions && Array.isArray(data.questions)) {
        setQuestions(data.questions);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!resultData) {
    return <div>Loading...</div>;
  }

  const getFraudColor = (score: number) => {
    if (score <= 10) return "success";
    if (score <= 50) return "warning";
    return "destructive";
  };

  const getFraudStatus = (score: number) => {
    if (score <= 10) return "Low Risk";
    if (score <= 50) return "Medium Risk";
    return "High Risk";
  };

  const getFraudIcon = (detected: boolean) => {
    return detected ? (
      <XCircle className="h-4 w-4 text-destructive" />
    ) : (
      <CheckCircle className="h-4 w-4 text-success" />
    );
  };

  const getFraudIndicatorStatus = (detected: boolean) => {
    return detected ? "Detected" : "Not Detected";
  };

  const getConfidenceColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Interview Fraud Detection Results</h1>
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <span><strong>Candidate:</strong> {resultData.candidate || resultData.candidateName}</span>
            <span><strong>Role:</strong> {resultData.role}</span>
            <span><strong>Processed:</strong> {new Date(resultData.processedAt).toLocaleString()}</span>
          </div>
        </div>

        {/* Main Fraud Detection Card */}
        <Card className={`mb-8 ${finalFraudScore <= 10 ? 'bg-gradient-to-r from-success/10 to-success/5 border-success/20' : finalFraudScore <= 50 ? 'bg-gradient-to-r from-warning/10 to-warning/5 border-warning/20' : 'bg-gradient-to-r from-destructive/10 to-destructive/5 border-destructive/20'}`}>
          <CardContent className="pt-8">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full mb-4 ${finalFraudScore <= 10 ? 'bg-success/10 border-4 border-success/20' : finalFraudScore <= 50 ? 'bg-warning/10 border-4 border-warning/20' : 'bg-destructive/10 border-4 border-destructive/20'}`}>
                <span className={`text-4xl font-bold ${finalFraudScore <= 10 ? 'text-success' : finalFraudScore <= 50 ? 'text-warning' : 'text-destructive'}`}>{finalFraudScore}</span>
              </div>
              <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                <Shield className="h-6 w-6" />
                Overall Fraud Risk Score
              </h2>
              <Badge variant={getFraudColor(finalFraudScore) as any} className="text-sm px-4 py-1">
                {getFraudStatus(finalFraudScore)}
              </Badge>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                {finalFraudScore <= 10 
                  ? "Interview shows minimal signs of fraudulent behavior. Natural responses and authentic voice patterns detected throughout."
                  : finalFraudScore <= 50 
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
          <h3 className="text-xl font-semibold mb-4">Question-by-Question Fraud Analysis</h3>
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
                        <Badge 
                          variant={getFraudColor(q.fraud_score) as any} 
                          className="text-sm px-3 py-1 font-medium"
                        >
                          Fraud Risk: {q.fraud_score}
                        </Badge>
                        <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 space-y-4">
                                          <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-foreground">Fraud Risk Score:</h4>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${q.fraud_score <= 10 ? 'bg-success text-success-foreground' : q.fraud_score <= 50 ? 'bg-warning text-warning-foreground' : 'bg-destructive text-destructive-foreground'}`}>
                            {q.fraud_score}
                          </div>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({getFraudStatus(q.fraud_score)})
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Candidate Response:
                      </h4>
                      <p className="text-muted-foreground leading-relaxed bg-muted/50 border border-muted/30 p-4 rounded-lg">
                        "{q.answer}"
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Fraud Detection Analysis:
                      </h4>
                                              <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="flex items-center justify-between p-3 bg-muted/50 border border-muted/30 rounded-lg">
                              <div className="flex items-center gap-2">
                                {getFraudIcon(q.insights.reading_aloud)}
                                <span className="font-medium text-sm">Reading Aloud</span>
                              </div>
                              <span className={`text-xs font-medium ${q.insights.reading_aloud ? 'text-destructive' : 'text-success'}`}>
                                {getFraudIndicatorStatus(q.insights.reading_aloud)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-muted/50 border border-muted/30 rounded-lg">
                              <div className="flex items-center gap-2">
                                {getFraudIcon(q.insights.external_help)}
                                <span className="font-medium text-sm">External Help</span>
                              </div>
                              <span className={`text-xs font-medium ${q.insights.external_help ? 'text-destructive' : 'text-success'}`}>
                                {getFraudIndicatorStatus(q.insights.external_help)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-muted/50 border border-muted/30 rounded-lg">
                              <div className="flex items-center gap-2">
                                {getFraudIcon(q.insights.scripted_content)}
                                <span className="font-medium text-sm">Scripted Content</span>
                              </div>
                              <span className={`text-xs font-medium ${q.insights.scripted_content ? 'text-destructive' : 'text-success'}`}>
                                {getFraudIndicatorStatus(q.insights.scripted_content)}
                              </span>
                            </div>
                          </div>
                                                  <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium text-foreground flex items-center gap-2">
                                <BarChart3 className="h-4 w-4" />
                                Analysis Confidence:
                              </h4>
                              <Badge variant="outline" className={getConfidenceColor(q.insights.confidence_level)}>
                                {q.insights.confidence_level.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="p-3 bg-muted/50 border border-muted/30 rounded-lg">
                              <p className="text-sm text-muted-foreground">{q.insights.details}</p>
                            </div>
                          </div>
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
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Fraud Detection Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {finalFraudScore <= 10 && (
                <div>
                  <h4 className="font-medium text-success mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Low Fraud Risk Detected
                  </h4>
                  <p className="text-muted-foreground">
                    The analysis indicates minimal fraud indicators. The candidate's responses appear 
                    natural and authentic with no significant signs of deceptive behavior.
                  </p>
                </div>
              )}
              {finalFraudScore > 10 && finalFraudScore <= 50 && (
                <div>
                  <h4 className="font-medium text-warning mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Medium Fraud Risk Detected
                  </h4>
                  <p className="text-muted-foreground">
                    Some potential fraud indicators have been detected. Review the individual question 
                    analysis for specific concerns and consider additional verification if needed.
                  </p>
                </div>
              )}
              {finalFraudScore > 50 && (
                <div>
                  <h4 className="font-medium text-destructive mb-2 flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    High Fraud Risk Detected
                  </h4>
                  <p className="text-muted-foreground">
                    Multiple fraud indicators detected across questions. <strong>Manual review and 
                    verification strongly recommended</strong> before proceeding with this candidate.
                  </p>
                </div>
              )}
              <div>
                <h4 className="font-medium text-primary mb-2">Next Steps:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Review detailed fraud analysis for each question above</li>
                  <li>Consider conducting a follow-up interview if medium/high risk detected</li>
                  <li>Verify candidate's background and references thoroughly</li>
                  <li>Document any additional verification steps taken</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;