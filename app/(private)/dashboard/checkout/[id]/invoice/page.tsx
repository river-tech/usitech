"use client";
import { InvoiceHeader, InvoiceCard } from "../../../../../../components/dashboard/checkout";
import WorkflowApi from "@/lib/api/Workflow";
import { useEffect, useState } from "react";
import { Invoice } from "@/lib/models/workflow";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function InvoicePage({ params }: PageProps) {
  const [id, setId] = useState<string>("");
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  
  useEffect(() => {
    const getParams = async () => {
      const p = await params;
      setId(p.id);
    };
    getParams();
  }, [params]);

  const getInvoice = async () => {
    if (!id) return;
    const workflowApi = WorkflowApi();
    const result = await workflowApi.getInvoice(id);
    if (result.success) {
      setInvoice(result.data);
    }
  };

  useEffect(() => {
    if (id) {
      getInvoice();
    }
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <InvoiceHeader />
      {invoice && <InvoiceCard invoice={invoice} />}
    </div>
  );
}


