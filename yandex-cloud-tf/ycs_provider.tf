//
// Terraform configuration
//
terraform {
  required_providers {
    yandex = {
      source  = "yandex-cloud/yandex"
      version = ">= 0.88.0"
    }
  }
  required_version = ">= 1.3.0"
}

//
// Provider configuration
//
provider "yandex" {
  service_account_key_file = var.yc_token
  cloud_id                 = var.yc_cloud_id
  folder_id                = var.yc_folder_id
  zone                     = var.yc_zone
}
