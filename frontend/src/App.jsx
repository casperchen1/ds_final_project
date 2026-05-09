import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, AlertTriangle, BookOpen, 
  GraduationCap, Globe, BookMarked, Layers, FileText,
  Calendar, Phone, Info
} from 'lucide-react';

// --- 結構化模擬資料 (符合現代 UI 需求的資料結構) ---
const dashboardData = {
  totalRequired: 128,
  totalEarned: 110, // 模擬已取得學分
  lastUpdated: '2026-05-08',
  catalogYear: '113學年度',
  categories: [
    {
      id: 'general',
      title: '通識課程',
      icon: Globe,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      required: 28,
      earned: 26,
      warnings: ['通識尚缺 2 學分'],
      items: [
        { name: '中文通', status: 'completed' },
        { name: '外文通', status: 'completed' },
        { name: '一般通識', status: 'completed' }
      ],
      detailId: 'g-total'
    },
    {
      id: 'core',
      title: '共同必修',
      icon: BookMarked,
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      required: 4, // 這裡以"門"為單位
      earned: 4,
      unit: '門',
      warnings: [],
      items: [
        { name: '體育', status: 'completed' }
      ],
      detailId: 'c-total'
    },
    {
      id: 'major',
      title: '本系必修/群修',
      icon: BookOpen,
      color: 'bg-violet-500',
      lightColor: 'bg-violet-50',
      textColor: 'text-violet-600',
      required: 51, // 36必修 + 15群修
      earned: 45,
      warnings: [
        '必修：缺「作業系統」、「計算機結構與組織」',
        '群修：缺A群2門、B群1門、C群1門、D群1門、E群1門'
      ],
      items: [
        { name: '必修科目 (36學分)', status: 'warning' },
        { name: '群修科目 (15學分)', status: 'warning' },
        { name: '選修科目', status: 'neutral' }
      ],
      detailId: 'm1'
    },
    {
      id: 'outside',
      title: '外系選修',
      icon: Layers,
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      required: 0, // 無特定下限，補足畢業學分用
      earned: 15,
      warnings: [],
      items: [
        { name: '選修科目', status: 'neutral' }
      ],
      detailId: 'o1'
    }
  ]
};

// 模擬明細資料
const mockDetailRecords = {
  'g-total': [
    { semester: '110-1', name: '基礎國文', credit: 2, score: 85, type: '中文通', status: 'passed' },
    { semester: '110-2', name: '大一英文', credit: 2, score: 78, type: '外文通', status: 'passed' },
    { semester: '111-1', name: '哲學概論', credit: 2, score: 90, type: '一般', status: 'passed' },
  ],
  'm1': [
    { semester: '110-1', name: '計算機概論', credit: 3, score: 88, type: '必修', status: 'passed' },
    { semester: '110-2', name: '程式設計(一)', credit: 3, score: 92, type: '必修', status: 'passed' },
    { semester: '111-1', name: '資料結構', credit: 3, score: 75, type: '必修', status: 'passed' },
    { semester: '-', name: '作業系統', credit: 3, score: '-', type: '必修', status: 'missing' },
    { semester: '-', name: '計算機結構與組織', credit: 3, score: '-', type: '必修', status: 'missing' },
  ]
};

// --- 共用進度條元件 ---
const ProgressBar = ({ current, max, colorClass }) => {
  const percentage = max > 0 ? Math.min(Math.round((current / max) * 100), 100) : 100;
  return (
    <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1 overflow-hidden">
      <div 
        className={`${colorClass} h-2.5 rounded-full transition-all duration-1000 ease-out`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

// --- 總覽頁面 (Dashboard) ---
const Dashboard = ({ onNavigate }) => {
  const totalPercentage = Math.round((dashboardData.totalEarned / dashboardData.totalRequired) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 頂部：總進度卡片 */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-60"></div>
        
        <div className="flex-1 z-10 w-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">總畢業學分進度</h2>
          </div>
          <p className="text-gray-500 mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            已取得 {dashboardData.totalEarned} / 應修 {dashboardData.totalRequired} 學分
          </p>
          
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-3 uppercase rounded-full text-blue-600 bg-blue-50">
                  達成率
                </span>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold inline-block text-blue-600">
                  {totalPercentage}%
                </span>
              </div>
            </div>
            <ProgressBar current={dashboardData.totalEarned} max={dashboardData.totalRequired} colorClass="bg-blue-600 h-3" />
          </div>
        </div>
      </div>

      {/* 類別卡片網格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dashboardData.categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            {/* 卡片標頭 */}
            <div className={`p-5 flex items-start gap-4 border-b border-gray-50 ${cat.lightColor}`}>
              <div className={`p-3 rounded-xl bg-white shadow-sm ${cat.textColor}`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{cat.title}</h3>
                <div className="text-sm text-gray-600 mt-1">
                  進度: <span className="font-semibold text-gray-800">{cat.earned}</span> / {cat.required} {cat.unit || '學分'}
                </div>
              </div>
            </div>

            {/* 卡片內容 */}
            <div className="p-5 flex-1 flex flex-col">
              <ProgressBar current={cat.earned} max={cat.required} colorClass={cat.color} />
              
              {/* 子項目列表 */}
              <div className="mt-6 flex-1 space-y-3">
                {cat.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                      {item.name}
                    </span>
                    {item.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                    {item.status === 'warning' && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                  </div>
                ))}
              </div>

              {/* 警告訊息區塊 */}
              {cat.warnings.length > 0 && (
                <div className="mt-6 bg-red-50/80 border border-red-100 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <ul className="text-sm text-red-700 space-y-1">
                      {cat.warnings.map((warn, idx) => (
                        <li key={idx}>{warn}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* 卡片底部按鈕 */}
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <button
                onClick={() => onNavigate(cat.detailId, cat.title)}
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2
                  ${cat.textColor} bg-white border border-gray-200 hover:border-current hover:shadow-sm`}
              >
                <FileText className="w-4 h-4" />
                查看修課明細
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 明細頁面 (Detail View) ---
const DetailView = ({ detailId, title, onBack }) => {
  const records = mockDetailRecords[detailId] || [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[600px] flex flex-col animate-in slide-in-from-right-8 duration-300">
      {/* 標頭 */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-10 rounded-t-2xl">
        <button 
          onClick={onBack}
          className="p-2.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500">修課明細紀錄</p>
        </div>
      </div>

      {/* 內容區 */}
      <div className="p-6 flex-1 bg-gray-50/50">
        {records.length > 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 text-gray-500 text-sm border-b border-gray-200">
                    <th className="py-4 px-6 font-medium whitespace-nowrap">學期</th>
                    <th className="py-4 px-6 font-medium">課程名稱</th>
                    <th className="py-4 px-6 font-medium">類別</th>
                    <th className="py-4 px-6 font-medium text-center">學分</th>
                    <th className="py-4 px-6 font-medium text-center">成績</th>
                    <th className="py-4 px-6 font-medium text-center">狀態</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {records.map((record, idx) => (
                    <tr 
                      key={idx} 
                      className={`hover:bg-gray-50 transition-colors ${record.status === 'missing' ? 'bg-red-50/30' : ''}`}
                    >
                      <td className="py-4 px-6 text-gray-600">{record.semester}</td>
                      <td className="py-4 px-6 font-semibold text-gray-800">{record.name}</td>
                      <td className="py-4 px-6 text-gray-500 text-sm">
                        <span className="bg-gray-100 px-2.5 py-1 rounded-md">{record.type}</span>
                      </td>
                      <td className="py-4 px-6 text-center font-medium text-gray-700">{record.credit}</td>
                      <td className="py-4 px-6 text-center font-medium text-gray-700">{record.score}</td>
                      <td className="py-4 px-6 text-center">
                        {record.status === 'missing' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-red-600 bg-red-50 text-sm font-medium border border-red-100">
                            <AlertTriangle className="w-3.5 h-3.5" /> 缺修
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-emerald-600 bg-emerald-50 text-sm font-medium border border-emerald-100">
                            <CheckCircle2 className="w-3.5 h-3.5" /> 通過
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-lg font-medium text-gray-500">尚無修課紀錄</p>
            <p className="text-sm mt-1">目前該類別沒有任何已登記的課程資料</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 主應用程式元件 ---
export default function App() {
  const [view, setView] = useState({ type: 'dashboard', detailId: null, title: '' });

  const navigateToDetail = (id, title) => {
    setView({ type: 'detail', detailId: id, title });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDashboard = () => {
    setView({ type: 'dashboard', detailId: null, title: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* 頂部導覽列 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-inner">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">畢業學分檢核系統</h1>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full font-medium text-gray-600">
              <Calendar className="w-4 h-4" />
              {dashboardData.catalogYear}
            </span>
          </div>
        </div>
      </header>

      {/* 聯絡與資訊橫幅 */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-6">
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-sm text-indigo-800">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <p className="font-medium">學分認定疑問？</p>
              <p className="text-indigo-600/80 mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> 註冊組: 02-29393091 分機 63279</span>
                <span>或洽詢系所承辦同仁</span>
              </p>
            </div>
          </div>
          <div className="text-indigo-400 text-xs sm:text-right shrink-0">
            資料最後更新<br className="hidden sm:block" /> {dashboardData.lastUpdated}
          </div>
        </div>
      </div>

      {/* 主要內容區 */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {view.type === 'dashboard' ? (
          <Dashboard onNavigate={navigateToDetail} />
        ) : (
          <DetailView 
            detailId={view.detailId} 
            title={view.title} 
            onBack={navigateToDashboard} 
          />
        )}
      </main>
      
      {/* 簡單的頁尾 */}
      <footer className="max-w-6xl mx-auto px-4 md:px-8 py-8 text-center text-sm text-gray-400">
        <p>© 2026 數位校園系統 - 學分檢核模組</p>
      </footer>
    </div>
  );
}