define([],function() {
           var questions =  [
               {
                   qname: 'cvd_step',
                   qtext: 'Treatment Stage',
                   qvals: ['None', 'Step 1', 'Step 2', 'Step 3', 'Step 4']
               },
               {
                   qname: 'cvd1',
                   qtext: 'Step 1',
                   qvals: ['None','ACE Inhibitor','Angiotension II receptor blocker (ARB)','Calcium-channel blocker (CCB)']
               },
               {
                   qname: 'cvd2',
                   qtext: 'Step 2',
                   qvals: ['None','ACE Inhibitor + Calcium-Channel blocker']
               },
               {
                   qname: 'cvd3',
                   qtext: 'Step 3',
                   qvals: ['None','ACE Inhibitor + Calcium-Channel blocker + Thiazide-like diuretic']
               },
               {
                   qname: 'cvd4',
                   qtext: 'Step 4',
                   qvals: ['None', 'A + C + D', 'Further Diuretic', 'Alpha-blocker', 'Beta-blocker', 'Expert Advice'],
               },
           ];
           return {
               questions:questions
           };
       });
