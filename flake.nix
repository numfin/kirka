{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        # [PREPARE]
        overlays = [ ];
        pkgs = import nixpkgs {
          inherit system overlays;
        };

        # [EXTERNAL DEPENDENCIES]
        buildInputs = with pkgs; [
          nodejs_23
          corepack_23
        ];
        nativeBuildInputs = with pkgs; [ ];
      in
      {
        devShells.default = pkgs.mkShell {
          inherit buildInputs nativeBuildInputs;
        };
      }
    );
}
