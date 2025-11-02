"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import WorkflowApi from "../api/Workflow";
import { Category, Workflow } from "../models/workflow";
import CategoryApi from "../api/Category";
import { WorkflowStatus } from "../models/enums";

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

  const workflowApi = WorkflowApi();
  const categoryApi = CategoryApi();
  const loadWorkflows = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      
      const allResult = await workflowApi.getAllWorkflows() ;
      
      
      if (allResult.success) {
        const data = allResult.data.filter((workflow: Workflow) =>  workflow.is_buy === null);
        setAllWorkflows(allResult.data);
      }

      // Load featured workflows
      const featuredResult = await workflowApi.getFeaturedWorkflows();
      
      if (featuredResult.success) {
        setFeaturedWorkflows(featuredResult.data);
      }
    } catch (error) {
      setError('Failed to load workflows');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const categoriesResult = await categoryApi.getAllCategories();
      if (categoriesResult.success) {
        setCategories(categoriesResult.data);
      }
    } catch (error) {
      setError('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshWorkflows = async () => {
    await loadWorkflows();
  };

  useEffect(() => {
    loadWorkflows();
    loadCategories();
  }, []);

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
