"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from "react";
import WorkflowApi from "../api/Workflow";
import { Category, Workflow } from "../models/workflow";
import CategoryApi from "../api/Category";

interface WorkflowContextType {
  allWorkflows: Workflow[];
  featuredWorkflows: Workflow[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  refreshWorkflows: () => Promise<void>;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

interface WorkflowProviderProps {
  children: ReactNode;
}

export function WorkflowProvider({ children }: WorkflowProviderProps) {
  const [allWorkflows, setAllWorkflows] = useState<Workflow[]>([]);
  const [featuredWorkflows, setFeaturedWorkflows] = useState<Workflow[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const workflowApi = useMemo(() => WorkflowApi(), []);
  const categoryApi = useMemo(() => CategoryApi(), []);
  const loadWorkflows = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      
      const allResult = await workflowApi.getAllWorkflows() ;
      
      
      if (allResult.success) {
        setAllWorkflows(allResult.data);
      }

      // Load featured workflows
      const featuredResult = await workflowApi.getFeaturedWorkflows();
      
      if (featuredResult.success) {
        setFeaturedWorkflows(featuredResult.data);
      }
    } catch {
      setError('Failed to load workflows');
    } finally {
      setIsLoading(false);
    }
  }, [workflowApi]);

  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const categoriesResult = await categoryApi.getAllCategories();
      if (categoriesResult.success) {
        setCategories(categoriesResult.data);
      }
    } catch {
      setError('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  }, [categoryApi]);

  const refreshWorkflows = useCallback(async () => {
    await loadWorkflows();
  }, [loadWorkflows]);

  useEffect(() => {
    loadWorkflows();
    loadCategories();
  }, [loadCategories, loadWorkflows]);

  const value: WorkflowContextType = {
    allWorkflows,
    featuredWorkflows,
    categories,
    isLoading,
    error,
    refreshWorkflows,
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
}
