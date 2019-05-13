declare namespace Rudget {
  interface BudgetCategory {
    id: string;
    name: string;
    amount: string;
    groupId: string;
  }

  interface BudgetGroup {
    id: string;
    name: string;
    categories?: BudgetCategory[];
  }

  interface ToastOptions {
    message: string;
    error?: boolean;
    title?: string;
  }
}
