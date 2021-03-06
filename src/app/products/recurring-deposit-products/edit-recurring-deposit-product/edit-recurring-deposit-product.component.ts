import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecurringDepositProductDetailsStepComponent } from '../recurring-deposit-product-stepper/recurring-deposit-product-details-step/recurring-deposit-product-details-step.component';
import { RecurringDepositProductCurrencyStepComponent } from '../recurring-deposit-product-stepper/recurring-deposit-product-currency-step/recurring-deposit-product-currency-step.component';
import { RecurringDepositProductTermsStepComponent } from '../recurring-deposit-product-stepper/recurring-deposit-product-terms-step/recurring-deposit-product-terms-step.component';
import { RecurringDepositProductSettingsStepComponent } from '../recurring-deposit-product-stepper/recurring-deposit-product-settings-step/recurring-deposit-product-settings-step.component';
import { RecurringDepositProductInterestRateChartStepComponent } from '../recurring-deposit-product-stepper/recurring-deposit-product-interest-rate-chart-step/recurring-deposit-product-interest-rate-chart-step.component';
import { RecurringDepositProductChargesStepComponent } from '../recurring-deposit-product-stepper/recurring-deposit-product-charges-step/recurring-deposit-product-charges-step.component';
import { RecurringDepositProductAccountingStepComponent } from '../recurring-deposit-product-stepper/recurring-deposit-product-accounting-step/recurring-deposit-product-accounting-step.component';

import { ProductsService } from 'app/products/products.service';

@Component({
  selector: 'mifosx-edit-recurring-deposit-product',
  templateUrl: './edit-recurring-deposit-product.component.html',
  styleUrls: ['./edit-recurring-deposit-product.component.scss']
})
export class EditRecurringDepositProductComponent implements OnInit {

  @ViewChild(RecurringDepositProductDetailsStepComponent) recurringDepositProductDetailsStep: RecurringDepositProductDetailsStepComponent;
  @ViewChild(RecurringDepositProductCurrencyStepComponent) recurringDepositProductCurrencyStep: RecurringDepositProductCurrencyStepComponent;
  @ViewChild(RecurringDepositProductTermsStepComponent) recurringDepositProductTermsStep: RecurringDepositProductTermsStepComponent;
  @ViewChild(RecurringDepositProductSettingsStepComponent) recurringDepositProductSettingsStep: RecurringDepositProductSettingsStepComponent;
  @ViewChild(RecurringDepositProductInterestRateChartStepComponent) recurringDepositProductInterestRateChartStep: RecurringDepositProductInterestRateChartStepComponent;
  @ViewChild(RecurringDepositProductChargesStepComponent) recurringDepositProductChargesStep: RecurringDepositProductChargesStepComponent;
  @ViewChild(RecurringDepositProductAccountingStepComponent) recurringDepositProductAccountingStep: RecurringDepositProductAccountingStepComponent;

  recurringDepositProductsTemplate: any;
  accountingRuleData = ['None', 'Cash'];

  constructor(private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router) {
    this.route.data.subscribe((data: { recurringDepositProductAndTemplate: any }) => {
      this.recurringDepositProductsTemplate = data.recurringDepositProductAndTemplate;
    });
  }

  ngOnInit() {
  }

  get recurringDepositProductDetailsForm() {
    return this.recurringDepositProductDetailsStep.recurringDepositProductDetailsForm;
  }

  get recurringDepositProductCurrencyForm() {
    return this.recurringDepositProductCurrencyStep.recurringDepositProductCurrencyForm;
  }

  get recurringDepositProductTermsForm() {
    return this.recurringDepositProductTermsStep.recurringDepositProductTermsForm;
  }

  get recurringDepositProductSettingsForm() {
    return this.recurringDepositProductSettingsStep.recurringDepositProductSettingsForm;
  }

  get recurringDepositProductInterestRateChartForm() {
    return this.recurringDepositProductInterestRateChartStep.recurringDepositProductInterestRateChartForm;
  }

  get recurringDepositProductAccountingForm() {
    return this.recurringDepositProductAccountingStep.recurringDepositProductAccountingForm;
  }

  get recurringDepositProductFormValidAndNotPrinstine() {
    return (
      this.recurringDepositProductDetailsForm.valid &&
      this.recurringDepositProductCurrencyForm.valid &&
      this.recurringDepositProductTermsForm.valid &&
      this.recurringDepositProductSettingsForm.valid &&
      this.recurringDepositProductInterestRateChartForm.valid &&
      this.recurringDepositProductAccountingForm.valid &&
      (
        this.recurringDepositProductDetailsForm.pristine ||
        this.recurringDepositProductCurrencyForm.pristine ||
        this.recurringDepositProductTermsForm.pristine ||
        this.recurringDepositProductSettingsForm.pristine ||
        this.recurringDepositProductInterestRateChartForm.pristine ||
        this.recurringDepositProductAccountingForm.pristine
      )
    );
  }

  get recurringDepositProduct() {
    return {
      ...this.recurringDepositProductDetailsStep.recurringDepositProductDetails,
      ...this.recurringDepositProductCurrencyStep.recurringDepositProductCurrency,
      ...this.recurringDepositProductTermsStep.recurringDepositProductTerms,
      ...this.recurringDepositProductSettingsStep.recurringDepositProductSettings,
      ...this.recurringDepositProductInterestRateChartStep.recurringDepositProductInterestRateChart,
      ...this.recurringDepositProductChargesStep.recurringDepositProductCharges,
      ...this.recurringDepositProductAccountingStep.recurringDepositProductAccounting
    };
  }

  submit() {
    // TODO: Update once language and date settings are setup
    const recurringDepositProduct = {
      ...this.recurringDepositProduct,
      charges: this.recurringDepositProduct.charges.map((charge: any) => ({ id: charge.id })),
      locale: 'en' // locale required for depositAmount
    };
    if (!recurringDepositProduct.description) {
      recurringDepositProduct.description = '';
    }
    delete recurringDepositProduct.advancedAccountingRules;
    this.productsService.updateRecurringDepositProduct(this.recurringDepositProductsTemplate.id, recurringDepositProduct)
      .subscribe((response: any) => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

}
