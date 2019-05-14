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

  interface RootState {
    session: {
      accessToken: string;
      loggedIn: boolean;
      sessionExpires: Date;
      userId: string;
    };
  }

  interface ToastOptions {
    message: string;
    error?: boolean;
    title?: string;
  }
}
