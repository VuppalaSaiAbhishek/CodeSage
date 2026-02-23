import { useState } from 'react';
import { INITIAL_HISTORY, MOCK_FILES } from '../constants/mocks';

export function useCodeChat() {
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [activeQ, setActiveQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const askQuestion = (query) => {
    const newQ = {
      id: Date.now(),
      query,
      answer: `Analysis complete: "${query}" is implemented across multiple modules with secondary effects in the controller layer.`,
      tags: ["ai-generated"],
      proof: [MOCK_FILES[0]]
    };
    setHistory(prev => [newQ, ...prev]);
    setActiveQ(newQ);
  };

  const filteredHistory = history.filter(h => 
    h.query.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { activeQ, setActiveQ, filteredHistory, searchQuery, setSearchQuery, askQuestion };
}