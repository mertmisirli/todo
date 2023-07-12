<template>
    <!-- Diğer etiketler -->

    <!-- Footer -->
    <MDBFooter :text="['center', 'lg-start', 'muted']" class="mt-5">
        <!-- Section: Social media -->
        <section class="d-flex justify-content-center p-3 border-bottom" style="background-color: rgba(0, 0, 0, 0.05)">
            <!-- Left -->

            <!-- Left -->

            <!-- Right -->
            <div>
                <a href="https://www.facebook.com/yurticikargo" target="_blank" class="me-4 text-reset " >
                    <i class="link-secondary pi pi-facebook " style="font-size: 1.5rem"></i>
                </a>
                <a href="https://twitter.com/yurticikargo" target="_blank" class="me-4 text-reset twitter">
                    <i class="link-secondary pi pi-twitter" style="font-size: 1.5rem"></i>
                </a>
                <a href="https://www.instagram.com/yurticikargo/" target="_blank" class="me-4 text-reset instagram">
                    <i class="link-secondary pi pi-instagram" style="font-size: 1.5rem"></i>
                </a>
                <a href="https://tr.linkedin.com/company/yurticikargo" target="_blank" class="me-4 text-reset linkedin">
                    <i class="link-secondary pi pi-linkedin" style="font-size: 1.5rem"></i>
                </a>
                <a href="https://www.youtube.com/c/yurticikargoservis" target="_blank" class="me-4 text-reset youtube">
                    <i class="link-secondary pi pi-youtube youtube" style="font-size: 1.5rem"></i>
                </a>
            </div>
            <!-- Right -->
        </section>
        <!-- Section: Social media -->



        <!-- Copyright -->
        <div class="text-center p-2" style="background-color: rgba(0, 0, 0, 0.05)">
            Copyright {{ new Date().getFullYear() }} - Yurtiçi Kargo Servisi A.Ş. ®
            <a class="text-reset fw-bold" href="https://www.yurticikargo.com/">yurticikargo.com</a>
        </div>
        <!-- Copyright -->
    </MDBFooter>
    <!-- Footer -->
</template>

<script>
import { MDBFooter, MDBRow, MDBCol, MDBContainer } from "mdb-vue-ui-kit";

export default {
    components: {
        MDBFooter,
        MDBRow,
        MDBCol,
        MDBContainer
    }
}


/*
        <section class="">
            <MDBContainer class="text-center text-md-start mt-5">
                <!-- Grid row -->
                <MDBRow class="mt-3">
                    <!-- Grid column -->
                    <MDBCol md="3" lg="4" xl="3" class="mx-auto mb-4">
                        <!-- Content -->
                        <h6 class="text-uppercase fw-bold mb-4">
                            <i class="fas fa-gem me-3 link-secondary"></i>Company name
                        </h6>
                        <p>
                            Here you can use rows and columns to organize your footer
                            content. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit.
                        </p>
                    </MDBCol>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <MDBCol md="2" lg="2" xl="2" class="mx-auto mb-4">
                        <!-- Links -->
                        <h6 class="text-uppercase fw-bold mb-4">Products</h6>
                        <p>
                            <a href="#!" class="text-reset">Angular</a>
                        </p>
                        <p>
                            <a href="#!" class="text-reset">React</a>
                        </p>
                        <p>
                            <a href="#!" class="text-reset">Vue</a>
                        </p>
                        <p>
                            <a href="#!" class="text-reset">Laravel</a>
                        </p>
                    </MDBCol>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <MDBCol md="3" lg="2" xl="2" class="mx-auto mb-4">
                        <!-- Links -->
                        <h6 class="text-uppercase fw-bold mb-4">Useful links</h6>
                        <p>
                            <a href="#!" class="text-reset">Pricing</a>
                        </p>
                        <p>
                            <a href="#!" class="text-reset">Settings</a>
                        </p>
                        <p>
                            <a href="#!" class="text-reset">Orders</a>
                        </p>
                        <p>
                            <a href="#!" class="text-reset">Help</a>
                        </p>
                    </MDBCol>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <MDBCol md="4" lg="3" xl="3" class="mx-auto mb-md-0 mb-4">
                        <!-- Links -->
                        <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                        <p>
                            <i class="fas fa-home me-3 link-secondary"></i> New York,
                            NY 10012, US
                        </p>
                        <p>
                            <i class="fas fa-envelope me-3 link-secondary"></i>
                            info@example.com
                        </p>
                        <p>
                            <MDBIcon icon="phone" class="me-3 link-secondary" />
                            + 01 234 567 88
                        </p>
                        <p>
                            <MDBIcon icon="print" class="me-3 link-secondary" />
                            + 01 234 567 89
                        </p>
                    </MDBCol>
                    <!-- Grid column -->
                </MDBRow>
                <!-- Grid row -->
            </MDBContainer>
        </section>
*/
</script>

<style>

</style>
