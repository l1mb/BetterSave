namespace AuthServiceApp.BL.Enums
{
    public enum OperationTypes
    {
        /// <summary>
        /// Income to account
        /// </summary>
        Increase, 
        /// <summary>
        /// How balance decreased
        /// </summary>
        Expense,
        /// <summary>
        /// If we transfer between cards
        /// </summary>
        Transfer,
        /// <summary>
        /// Transfer to save account
        /// </summary>
        Save
    }
}
