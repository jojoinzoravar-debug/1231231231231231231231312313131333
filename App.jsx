import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TABS, PRESET_REVIEWERS } from './data.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('reviewers');
  const [selectedReviewers, setSelectedReviewers] = useState([]);
  const [promotee, setPromotee] = useState({ username:'', currentRank:'', targetRank:'', reason:'Activity Recognized!' });

  const addReviewer = (r) => {
    if (!selectedReviewers.find(s=>s.username===r.username))
      setSelectedReviewers([...selectedReviewers,r]);
  };
  const removeReviewer = (username) =>
    setSelectedReviewers(selectedReviewers.filter(r=>r.username!==username));

  const generatedOutput = useMemo(()=>{
    if(!promotee.username) return '// Awaiting data input...';
    return `
Your Username: ${selectedReviewers.map(r=>r.username).join(', ')}
Your Rank: ${selectedReviewers.map(r=>r.rank).join(', ')}
Their Username: ${promotee.username}
Old Rank - New Rank: ${promotee.currentRank} - ${promotee.targetRank}
Reason: ${promotee.reason}
    `.trim();
  },[selectedReviewers,promotee]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="sticky top-0 bg-[#0d1421]/90 backdrop-blur-md z-50 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"></div>
          <div>
            <div className="font-bold tracking-wider uppercase text-lg">SYSTEM</div>
            <div className="text-cyan-400 text-xs tracking-wider">CONTROL INTERFACE // OUTPUT TOOL</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mt-6 overflow-x-auto">
        {TABS.map(tab=>(
          <button
            key={tab.id}
            className={`px-4 py-2 font-semibold uppercase tracking-wider transition-colors duration-300
              ${activeTab===tab.id?`text-${tab.color}-400`:'text-gray-400 hover:text-white'}`}
            onClick={()=>setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <AnimatePresence exitBeforeEnter>
          {activeTab==='reviewers' && (
            <motion.div key="reviewers" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <div className="grid grid-cols-2 gap-4">
                {PRESET_REVIEWERS.map(r=>(
                  <div key={r.username} className={`p-4 border rounded-md cursor-pointer ${selectedReviewers.find(s=>s.username===r.username)?'bg-cyan-500/10 border-cyan-500/30 opacity-50 cursor-not-allowed':'border-gray-800 hover:border-cyan-500 hover:bg-cyan-500/5'}`} onClick={()=>addReviewer(r)}>
                    <div className="text-cyan-400 font-semibold">{r.username}</div>
                    <div className="text-gray-500 text-sm">{r.rank}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab==='promotion' && (
            <motion.div key="promotion" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="space-y-4">
              <input type="text" placeholder="Candidate Username" className="p-2 bg-[#0d1421] border border-gray-800 rounded w-full" value={promotee.username} onChange={e=>setPromotee({...promotee, username:e.target.value})}/>
              <input type="text" placeholder="Current Rank" className="p-2 bg-[#0d1421] border border-gray-800 rounded w-full" value={promotee.currentRank} onChange={e=>setPromotee({...promotee, currentRank:e.target.value})}/>
              <input type="text" placeholder="Target Rank" className="p-2 bg-[#0d1421] border border-cyan-500/30 rounded w-full text-cyan-400" value={promotee.targetRank} onChange={e=>setPromotee({...promotee, targetRank:e.target.value})}/>
              <textarea className="w-full p-2 bg-[#0d1421] border border-gray-800 rounded" rows={4} value={promotee.reason} onChange={e=>setPromotee({...promotee, reason:e.target.value})}></textarea>
            </motion.div>
          )}

          {activeTab==='output' && (
            <motion.div key="output" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <pre className="bg-black/40 border border-gray-900 p-4 rounded max-h-[600px] overflow-y-auto text-gray-300">{generatedOutput}</pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
