<script>
  import { _ } from "../modules/i18n.js";
</script>

<div class="background" />
<h2>{$_("inactive-warning")}</h2>

<style>
  .background {
    background: linear-gradient(236.04deg, rgba(252, 234, 189, 0.504) 33.11%, rgba(172, 232, 210, 0.63) 73.6%), #d2e8e1;
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
  h2 {
    font-size: 56px;
    z-index: 5;
    width: 60%;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
  }
</style>
