import { useState } from 'react';
import { Star, Send, X } from 'lucide-react';
import { userFeedbackService } from '../services/databaseService';
import { UserFeedback } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string;
}

export default function FeedbackModal({ isOpen, onClose, serviceType }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setSubmitting(true);
    try {
      const feedbackData: Omit<UserFeedback, 'id'> = {
        service_type: serviceType,
        rating,
        feedback: feedback || undefined,
        suggestions: suggestions || undefined
      };

      await userFeedbackService.create(feedbackData);
      alert('Thank you for your feedback!');
      onClose();
      setRating(0);
      setFeedback('');
      setSuggestions('');
    } catch (error) {
      alert('Error submitting feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1e293b] rounded-xl p-6 max-w-md w-full mx-4 border border-[#334155]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[#e5e7eb] font-bold text-lg">Rate Your Experience</h3>
          <button onClick={onClose} className="text-[#94a3b8] hover:text-[#e5e7eb]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#e5e7eb] font-medium mb-2">Rating *</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-1 ${star <= rating ? 'text-yellow-400' : 'text-[#94a3b8]'}`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[#e5e7eb] font-medium mb-2">Feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us about your experience..."
              className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-3 py-2 focus:outline-none focus:border-[#38bdf8] resize-none h-20"
            />
          </div>

          <div>
            <label className="block text-[#e5e7eb] font-medium mb-2">Suggestions</label>
            <textarea
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              placeholder="How can we improve?"
              className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-3 py-2 focus:outline-none focus:border-[#38bdf8] resize-none h-20"
            />
          </div>

          <button
            type="submit"
            disabled={rating === 0 || submitting}
            className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] disabled:bg-[#334155] text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {submitting ? (
              'Submitting...'
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Feedback
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}