import { useState, useCallback } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { simulateExtraction, getTargetFormType, type ExtractionResult } from '@/data/mockExtraction';
import type { FormDataType } from '@/types';

interface AutoFillState {
  isExtracting: boolean;
  lastExtraction: ExtractionResult | null;
  error: string | null;
}

export function useAutoFill() {
  const { dispatch, state } = useDashboard();
  const [autoFillState, setAutoFillState] = useState<AutoFillState>({
    isExtracting: false,
    lastExtraction: null,
    error: null,
  });

  const triggerExtraction = useCallback(
    async (file: File): Promise<ExtractionResult | null> => {
      setAutoFillState((prev) => ({
        ...prev,
        isExtracting: true,
        error: null,
      }));

      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        const result = await simulateExtraction(file.name);

        if (result.success) {
          const targetFormType = getTargetFormType(result.data);
          
          // Auto-fill the form with extracted data
          dispatch({
            type: 'AUTO_FILL_FROM_EXTRACTION',
            payload: {
              formType: targetFormType,
              data: result.data,
            },
          });

          setAutoFillState({
            isExtracting: false,
            lastExtraction: result,
            error: null,
          });

          return result;
        } else {
          throw new Error('Extraction failed');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown extraction error';
        setAutoFillState({
          isExtracting: false,
          lastExtraction: null,
          error: errorMessage,
        });
        return null;
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [dispatch]
  );

  const extractAndFillForForm = useCallback(
    async (file: File, targetForm: FormDataType): Promise<ExtractionResult | null> => {
      setAutoFillState((prev) => ({
        ...prev,
        isExtracting: true,
        error: null,
      }));

      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        const result = await simulateExtraction(file.name);

        if (result.success) {
          // Fill the specified form regardless of detected type
          dispatch({
            type: 'AUTO_FILL_FROM_EXTRACTION',
            payload: {
              formType: targetForm,
              data: result.data,
            },
          });

          setAutoFillState({
            isExtracting: false,
            lastExtraction: result,
            error: null,
          });

          return result;
        } else {
          throw new Error('Extraction failed');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown extraction error';
        setAutoFillState({
          isExtracting: false,
          lastExtraction: null,
          error: errorMessage,
        });
        return null;
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [dispatch]
  );

  const clearError = useCallback(() => {
    setAutoFillState((prev) => ({
      ...prev,
      error: null,
    }));
  }, []);

  return {
    ...autoFillState,
    triggerExtraction,
    extractAndFillForForm,
    clearError,
    activeForm: state.activeForm,
  };
}


