import React from 'react';
import { AppView } from '../types';
import { USER_AVATAR } from '../constants';

interface SocialFeedProps {
  onNavigate: (view: AppView) => void;
  onFabClick: () => void;
  activeView: AppView;
}

export const SocialFeed: React.FC<SocialFeedProps> = ({ onNavigate, onFabClick, activeView }) => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24 bg-nura-bg dark:bg-background-dark font-jakarta animate-fade-in transition-colors duration-300">
      
      {/* TopAppBar - Cleaned up to avoid overlapping functions */}
      <div className="sticky top-0 z-50 flex items-center bg-nura-bg/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-nura-border dark:border-white/5 transition-colors">
        <div className="flex w-10 shrink-0 items-center justify-start">
           {/* Replaced Menu with Logo Icon to avoid nav confusion */}
           <div className="size-8 rounded-full bg-nura-petrol/10 dark:bg-primary/10 flex items-center justify-center text-nura-petrol dark:text-primary">
              <span className="material-symbols-outlined text-lg">spa</span>
           </div>
        </div>
        <h2 className="text-nura-main dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Feed the Flow</h2>
        <div className="flex w-10 items-center justify-end">
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-nura-main dark:text-white">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
      </div>

      {/* StoryCarousel (Hero Progress) */}
      <div className="flex w-full overflow-x-auto no-scrollbar px-4 py-4 space-x-4">
        {/* Add Flow Button - Updated to look like 'My Story' */}
        <div className="flex flex-col justify-start gap-2 min-w-[80px] text-center cursor-pointer group">
          <div 
            onClick={onFabClick}
            className="relative w-full aspect-[3/4] rounded-2xl bg-nura-card dark:bg-surface-dark border border-nura-border dark:border-white/10 flex items-center justify-center overflow-hidden transition-transform group-active:scale-95"
          >
            <div 
               className="absolute inset-0 bg-cover bg-center opacity-50" 
               style={{ backgroundImage: `url("${USER_AVATAR}")` }}
            ></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="size-10 rounded-full bg-nura-petrol dark:bg-primary flex items-center justify-center text-white shadow-lg border-2 border-nura-bg dark:border-background-dark z-10">
              <span className="material-symbols-outlined text-[20px]">add</span>
            </div>
          </div>
          <p className="text-nura-main dark:text-white text-xs font-semibold truncate">Meu Flow</p>
        </div>
        
        {/* Story 1 */}
        <div className="flex flex-col justify-start gap-2 min-w-[80px] text-center cursor-pointer group">
          <div className="w-full relative aspect-[3/4] rounded-2xl p-0.5 bg-gradient-to-tr from-nura-petrol to-nura-brown dark:from-primary dark:to-purple-500">
            <div className="w-full h-full rounded-[14px] border-2 border-nura-bg dark:border-background-dark overflow-hidden relative">
               <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAOE528zHEt9w-EHn0aCAedXCltxL-DxvEgPh22RANfUobVWAeH2lnmJx_sDchnODfgiUVcac6a5oo2_4LQ-J8nUGn71fA-Ptcv1sRQfVXPVpxgpFRheXyrB4s9UxBUFJLULVsMe2N-YANnr4x831RFi9x8yFrn2wxPRAiyiScTBcYqL5Cgb2LUX-mWNuzvvFMMWIndAzrr8uT4gfsWzqiR_oDNxAdIkS1fc3m3sv1YZaGR8nIA7YdG9V7pGqKlsnAiuLHVe67683E")' }}></div>
            </div>
          </div>
          <p className="text-nura-main dark:text-white text-xs font-medium truncate">Day 12</p>
        </div>
        
        {/* Story 2 */}
        <div className="flex flex-col justify-start gap-2 min-w-[80px] text-center cursor-pointer group">
          <div className="w-full relative aspect-[3/4] rounded-2xl p-0.5 bg-gray-200 dark:bg-white/10">
            <div className="w-full h-full rounded-[14px] border-2 border-nura-bg dark:border-background-dark overflow-hidden relative">
               <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCB-Sf94zMXP3pt9OI6UIf6mGktEym6ouWfnEvcU7BWuHkHBEv-XgtLt_Us-M1gk2hgpF5BHqc8X4N6gLOLt6CZq7JBRu3o4hcA6J2e8unDl38Mw-VMA8K20FGlkyisvEAa6CdfjJTKRUELXIXsPtQZYC0O3S9I685LxmNDjNB0dffi18iLFOe3nO72-DmU5eqRI5LuvslyeGKw5b6OJBvHfcAaTZ-7GwnwguC-V_FAEFg29wRoYfh6zeNU9gXhRpphvZmZkt8xsNA")' }}></div>
            </div>
          </div>
          <p className="text-nura-muted dark:text-slate-400 text-xs font-medium truncate">Workout</p>
        </div>
        
        {/* Story 3 */}
        <div className="flex flex-col justify-start gap-2 min-w-[80px] text-center cursor-pointer group">
          <div className="w-full relative aspect-[3/4] rounded-2xl p-0.5 bg-gray-200 dark:bg-white/10">
            <div className="w-full h-full rounded-[14px] border-2 border-nura-bg dark:border-background-dark overflow-hidden relative">
               <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBXUj0qHaXjHO0zZCwohw-bjtEdyZ78m74ibqFa72n_GaE4R2GRrVa6-jT61H0hylyD97zdU0VdUsG2mpAGDqo0mRJz5WcjPFJfRoxZmP_4aqtyAe6UNDbx95ps-v9c2m2FyVHW3uXn7yG0X1WLmFcqb8Hmuijo0jCv-fMXy8tSfk8oL6VZvaOSczQjAmaCLYq5dRuZK-UrmDGvooMM-0f3GWewOtqv084crc755OJnDEaSZq4_jIDyKI9_lQC_kojsYc-JGbOt1AI")' }}></div>
            </div>
          </div>
          <p className="text-nura-muted dark:text-slate-400 text-xs font-medium truncate">Sunday Prep</p>
        </div>

        {/* Story 4 */}
        <div className="flex flex-col justify-start gap-2 min-w-[80px] text-center cursor-pointer group">
          <div className="w-full relative aspect-[3/4] rounded-2xl p-0.5 bg-gradient-to-tr from-nura-petrol to-nura-brown dark:from-primary dark:to-purple-500">
            <div className="w-full h-full rounded-[14px] border-2 border-nura-bg dark:border-background-dark overflow-hidden relative">
               <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuClrspA-hAwyWGcZVndGSbI6fhYdhTn3IXp-jpspXbV6ULuzy2jNHnmlqkWQzFF2fiYn6EW_r021c6BkDj9oCt4J0ISkyxwTDmP23EieddvAY2yiXNUxkhiIf5NB_ZjRn3iOjgED2CBkM1JndNHZgFwbDm1YFRMhddnhzCs22Ff2YAenpsJv-XUYohw8jj8Z2ZqQDPQCrXTqGqtZwEeQzmaRcab16VqzyR84wI9htznFzqgpuXdrnPfW5RUUaTkiIo1GFwfeGJ-cPw")' }}></div>
            </div>
          </div>
          <p className="text-nura-main dark:text-white text-xs font-medium truncate">Flow State</p>
        </div>
      </div>

      {/* Trending Section */}
      <div className="px-4 pb-2 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-nura-main dark:text-white text-xl font-bold leading-tight">Trending Flows</h2>
          <button className="text-nura-petrol dark:text-primary text-sm font-semibold hover:opacity-80">Ver todos</button>
        </div>
        
        {/* Featured Card */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-sm border border-nura-border dark:border-white/5 bg-white dark:bg-surface-dark group">
          <div className="absolute top-3 right-3 z-10 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
            <p className="text-white text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-nura-petrol-light dark:text-primary">local_fire_department</span>
              Hot
            </p>
          </div>
          <div className="w-full aspect-video bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZPsvwbVxMW7GoGlwU3Pn_xPBq4iX7ZSStVh0ofg2xwJyDLQ9JCP5vYORC1NezGxg6QSjwKL2NWYqf7jICpteecBF0m2NPM9zFBCecbBSkIWLwkCDE3fR2PicnmI_O3Tp0VbzPZvQVGJGHIIL3AivdyEdz6d82OuxK7YjKooYYIchjLUjYd6zjLNxh9XjLIohOKzSXSAnZVZ7xDkzY71CBR3D_01SvgxAK-MQxSVVVeYiZIiTlFC8_pw7raUOmxCqKtUVqm7-CtUs")' }}></div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-6 rounded-full bg-gray-300 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_0eVRnDNkSiI4YY-n4gz7Yc3rR8_WkpMC6cqcIEWy7SsfltGLGTtZCBt2TMuJUTMdlcH84MzLb5MZSaiTOu2LIze4LhNxDYRCqfgLjqqcs-FdsB5Jp1kMJryuNCCCbgNSBs9O9ahYpQd3tJWUrGMWvi0ED8eLK4WWW0638rZBFQobzx1tdiSH35tWKfAv0DTHcU7xR_-lJw-nwS93Z98vB4uv1hH_ShmN9M1VZ5hM-mCCeQHIT6KQ_bwAUuVjttITpGNa8iSnr04")' }}></div>
              <p className="text-nura-muted dark:text-[#9db7b9] text-xs font-medium">@julia_m • Pro Member</p>
            </div>
            <h3 className="text-nura-main dark:text-white text-lg font-bold leading-tight mb-1">Detox Mode: Day 12 Results</h3>
            <p className="text-nura-muted dark:text-gray-400 text-sm line-clamp-2">Feeling lighter and more energetic. The green juice protocol is definitely working wonders for my focus.</p>
            <div className="mt-4 flex items-center justify-between border-t border-nura-border dark:border-white/5 pt-3">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-nura-muted dark:text-slate-400 hover:text-nura-petrol dark:hover:text-primary transition-colors group/btn">
                  <span className="material-symbols-outlined text-[20px] group-hover/btn:fill-1" style={{ fontVariationSettings: "'FILL' 0" }}>water_drop</span>
                  <span className="text-sm font-semibold">42</span>
                </button>
                <button className="flex items-center gap-1 text-nura-muted dark:text-slate-400 hover:text-nura-main dark:hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                  <span className="text-sm font-semibold">8</span>
                </button>
              </div>
              <span className="text-xs text-nura-muted/80 dark:text-slate-500">2h ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Community Masonry Grid */}
      <div className="px-4 py-4">
        <h2 className="text-nura-main dark:text-white text-xl font-bold leading-tight mb-3">Comunidade</h2>
        <div className="grid grid-cols-2 gap-3">
          {/* Item 1 */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] group cursor-pointer shadow-sm">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCbq_Nmk0jfmLYpvzgn9U1zY0TcfA_2dbPbKU25Gu57OelxC82Nvsncxyalg8DJ4G8-7e2D3ckC85OusgvjSZBSHUcOUkfQtfVNrD3KaGQoN2JnnnrrAC7vxLQU-rdUlvTDqmZr65s_f2WlPe42zCXklZ0p1puZFAneH4_LX9LlY32o1ij1ueqPsP69UlWpW9uJHDuo7vmPxuiI4fClff3I8dX6vDkGx7lHbZ6lNsHJkGXTc2WeECbqvR_m6VZyxowAMK2zF2lMO2w")' }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white text-sm font-bold leading-tight line-clamp-2 mb-1">Sunday Rituals</p>
                  <p className="text-gray-300 text-[10px]">@sarah_fit</p>
                </div>
                <button className="size-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-nura-petrol dark:hover:bg-primary hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[18px]">water_drop</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Item 2 */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] group cursor-pointer shadow-sm">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB0lv5F1tj3HqrVUC5AUq6pQH6QFG3uaQAjAu59Bg52rqyXqJmp__A2NsLoJCLbS-G-C3b7ix3Uye9Z1TOqaeNz6Vu1c8qkdZoT9cWI0RxwOoVwmjIEvK7DDUB7Tt0q7P_ZQF7cxJ6mXkl_Mq493yxOsBEvvQMkAjBrMH20BEBaT3ZIBSjUqBNfXc_mZlYUq_WPZcx5nvRloU8EgrgBhAILpb0dFCLbhQma-_Ct0RCO1J5Y5gZLQtPXXjcVFqLXNLkk6t7bCaf4hh8")' }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white text-sm font-bold leading-tight line-clamp-2 mb-1">2kg Down! 🎉</p>
                  <p className="text-gray-300 text-[10px]">@mike_runs</p>
                </div>
                <button className="size-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-nura-petrol dark:text-primary hover:bg-nura-petrol dark:hover:bg-primary hover:text-white transition-colors">
                   <span className="material-symbols-outlined text-[18px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Item 3 */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/6] group cursor-pointer shadow-sm">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQ2MEd1AxnFiHWFT54qghy86i3e0HK60idaw6GUmgHHPsKKtcNbSIUpkIgfiozkI07_nWpRYyxLyK8HCIveYOjY0vWXTwSWaIXpZU9QQmelo8ldvUIUEO-I_OTYDpJ87jTbWWDk6qvVwyevhojvfw39hj_ua3W0A5ux5GrpDvOg0JcoiszfoUwipVC76ivUXUHGJ-XwroiuiejAyUGCfLXLwCs0HNqiPvNZOpHb18LOxfU_uXt1i4zVSUQk7Tjw23mO7rXhDplK7k")' }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white text-sm font-bold leading-tight line-clamp-2 mb-1">Morning Flow</p>
                  <p className="text-gray-300 text-[10px]">@emily_yoga</p>
                </div>
                <button className="size-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-nura-petrol dark:hover:bg-primary hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[18px]">water_drop</span>
                </button>
              </div>
            </div>
          </div>

          {/* Item 4 */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/6] group cursor-pointer shadow-sm">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA1OpwCnMTGVwutxXO4s4M3mHph3pX4Hj0oWPH0ds94eVjlXL6RamhR---cHEV8lnBxaCgKzApPdR7QZRtMn2SnqPfvNFJVpiTdyd2ym2cnRmjaMG46KvoPpviV0ZRkDqOLBaGex_kuAmtdCq5rAqxVCxNZR34vSTXNWf45QMgZOiPNDpbziFkOnxe5S9hQcZW74ir4m25VQJTtbaER8lGRHqG65X527yumMrlApGECzW_lQ3-EmM02273RMstl88Y7OmgZo7mn-xc")' }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white text-sm font-bold leading-tight line-clamp-2 mb-1">Green Detox</p>
                  <p className="text-gray-300 text-[10px]">@alex_cooks</p>
                </div>
                <button className="size-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-nura-petrol dark:hover:bg-primary hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[18px]">water_drop</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};