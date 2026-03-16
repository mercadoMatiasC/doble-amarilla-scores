import { useEffect, useRef, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLiveGames } from './useLiveGames';

export function useLiveSync(baseData, queryToInvalidate) {
  const queryClient = useQueryClient();
  const { data: liveData } = useLiveGames(true);
  const prevLiveIdsRef = useRef([]);

  useEffect(() => {
    if (!liveData?.data) return;
    const currentLiveIds = liveData.data.map(m => m.id);
    
    const didAMatchFinish = prevLiveIdsRef.current.some(id => !currentLiveIds.includes(id));

    if (didAMatchFinish && queryToInvalidate) 
      queryClient.invalidateQueries({ queryKey: [queryToInvalidate] });

    prevLiveIdsRef.current = currentLiveIds;
  }, [liveData, queryClient, queryToInvalidate]);

  const mergedGames = useMemo(() => {
    const baseList = baseData ?? [];
    if (!liveData?.data) return baseList;

    const liveMap = new Map(liveData.data.map(u => [u.id, u]));

    return baseList.map(game => {
      const update = liveMap.get(game.id);
      return update ? { ...game, ...update } : game;
    });
  }, [baseData, liveData]);

  return { mergedGames, liveData };
}